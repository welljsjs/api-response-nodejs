# api-response-nodejs

## Purpose 🤨
This module can be used to standardize API error responses.

Instead of having [_magic numbers_](https://en.wikipedia.org/wiki/Magic_number_(programming)#Unnamed_numerical_constants) or strings in your code, this module will simplify to send errors: 

_Before_:
```js
router.get('/custom_path', (req, res, next) => {
  // This is really messy and confusing and can easily lead to typos.
  res.status(403).send({ errors: [{ status: 403, detail: "You're not authorized" }] });
});
```
_With this module_:
```js
router.get('/custom_path', (req, res, next) => {
  // This is nicer to read and promises less typos.
  res.jsonError(forbidden());
});
```
A JSON response might look like the following (optionally, it can contain more specified fields or even less, see below):

```json
{
    "errors": [
        {
            "status": 403,
            "title": "Forbidden",
            "detail": "You don't have permission to access the requested resource on the server",
            "source": {
                "pointer": "/v1/animals/"
            }
        }
    ]
}
```
Errors will always be wrapped up as an array with the key '_errors_'.


## How to use
Before implementing or using your own custom routes, you need to use the _apiResponse_ middleware.

```js
const apiResponse = require('apiResponse');
// ...
// const app = require('express')();

app.use(apiResponse.jsonError());
// Use own/custom routes
// ...
```

Then, within your routes, you can simply call `res.jsonError()`: 
```js
const { unauthorized } = require('apiResponse');
// ... setting up router etc.
router.get('/your_path_needing_authentication', (req, res, next) => {
  res.jsonError(unauthorized());
});
```

## Customization ✏️
In addition to that, you can easily use your own messages or custom error properties. Let's expand the example from above:
```js
router.get('/your_path_needing_authentication', (req, res, next) => {
  res.jsonError(unauthorized({ message: "What's up! You need to authenticate before being able to continue." }));
});
```

When not specifiying a custom message, this module will send a default message for every status code.

As you can see, you can pass some options to every error function. Here's a list of supported options: 

- `pointer`: a JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the value in the request document that caused the error [e.g. `"/data"` for a primary data object, or `"/data/attributes/title"` for a specific attribute]. This __MUST__ point to a value in the request document that exists; if it doesn’t, the client __SHOULD__ simply ignore the pointer.
- `parameter`: a string indicating which URI query parameter caused the error.
- `message`: a human-readable explanation specific to this occurrence of the problem.

As you might have noticed, all errors are returned conforming to the suggested JSON API error specifiction format (v1.1): 
https://jsonapi.org/format/1.1/#errors

## Multiple errors and `res.jsonError()`
The `jsonError()` function takes one or more arguments. You can pass only one error, multiple errors as multiple arguments or an array of errors or a combination of all: 
All following implementations will work: 

1. 
```js
res.jsonError(unauthorized());
```
2. 
```js
res.jsonError(unauthorized(), forbidden(), notFound());
```
3.
```js
res.jsonError([unauthorized(), forbidden(), notFound()]);
```
4. 
```js
res.jsonError(unauthorized(), [forbidden(), notFound()], notImplemented());
```

## Participation and Contribution 🍻
### We're actively looking for contributors!
Want to participate in the project? 👇🏼  
  - [Fork the project](https://github.com/welljsjs/api-response-nodejs/fork/) 🍴
  - Create a Pull Request or an Issue to suggest modifications/extensions 🤝

