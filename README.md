# use-abortable-fetch

[![Build Status](https://travis-ci.org/mauricedb/use-abortable-fetch.svg?branch=master)](https://travis-ci.org/mauricedb/use-abortable-fetch) [![Greenkeeper badge](https://badges.greenkeeper.io/mauricedb/use-abortable-fetch.svg)](https://greenkeeper.io/)

React hook that does a fetch and aborts when the components is unloaded or a new fetch request is started.

# Installation

`npm install use-abortable-fetch`
or
`yarn add use-abortable-fetch`

## Example usage:

```JavaScript
import React from 'react';
import useAbortableFetch from 'use-abortable-fetch';

const ChuckNorrisJoke = () => {
  const { data, loading, error, abort } = useAbortableFetch(
    '//api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript'
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return <div>Joke: {data.value.joke}</div>;
};

export default ChuckNorrisJoke;
```

See this [CodeSandbox](https://codesandbox.io/s/n5q6xmwwq0) for a running example.
