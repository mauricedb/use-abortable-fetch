# use-abortable-fetch
React hook that does a fetch and aborts when the components is unloaded

_Warning: Hooks are currently a React [RFC](https://github.com/reactjs/rfcs/pull/68) and **not ready for production**. Use at minimum `react@16.7.0-alpha.0` to use this package._

# Installation

`npm install use-abortable-fetch`
or
`yarn add use-abortable-fetch`

## Example usage:
```
import React from 'react';
import useAbortableFetch from 'use-abortable-fetch';

const ChuckNorrisJoke = () => {
  const { data: joke, loading, error, abort } = useAbortableFetch(
    '//api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript'
  );

  if (loading) return 'Loading...';
  if (error) return 'Error: ' + error;
  if (!joke) return null;

  return <div>Joke: {joke.value.joke}</div>;
};

export default ChuckNorrisJoke;
```
