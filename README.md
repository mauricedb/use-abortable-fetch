# use-abortable-fetch

[![Build Status](https://travis-ci.org/mauricedb/use-abortable-fetch.svg?branch=master)](https://travis-ci.org/mauricedb/use-abortable-fetch)

React hook that does a fetch and aborts when the components is unloaded or a new fetch is started.

_Warning: Hooks are currently a React [RFC](https://github.com/reactjs/rfcs/pull/68) and **not ready for production**. Use at minimum `react@16.7.0-alpha.0` to use this package._

# Installation

`npm install use-abortable-fetch`
or
`yarn add use-abortable-fetch`

## Example usage:

```JavaScript
import React from 'react';
import useAbortableFetch from 'use-abortable-fetch';

const ChuckNorrisJoke = () => {
  const { data: joke, loading, error, abort } = useAbortableFetch(
    '//api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript'
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!joke) return null;

  return <div>Joke: {joke.value.joke}</div>;
};

export default ChuckNorrisJoke;
```

See this [CodeSandbox](https://codesandbox.io/s/n5q6xmwwq0) for a running example.
