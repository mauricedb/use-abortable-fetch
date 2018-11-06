import React from 'react';
import ReactDOM from 'react-dom';

import useAbortableFetch from '../src';

const Joke = ({ url }) => {
  const { data: joke, loading, error, abort } = useAbortableFetch(url);

  if (loading)
    return (
      <div>
        Loading... <button onClick={abort}>Cancel</button>
      </div>
    );
  if (error)
    return (
      <div>
        Error: {error.status} {error.message}
      </div>
    );
  if (!joke) return null;

  return (
    <div>
      <p>{joke.value.joke}</p>
    </div>
  );
};

ReactDOM.render(
  <Joke url="//api.icndb.com/jokes/random/?escape=javascript" />,
  document.getElementById('root')
);

ReactDOM.render(
  <Joke url="//api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript" />,
  document.getElementById('root')
);

document.getElementById('render').addEventListener('click', () => {
  ReactDOM.render(
    <Joke url="//api.icndb.com/jokes/random/?escape=javascript" />,
    document.getElementById('root')
  );

  ReactDOM.render(
    <Joke url="//api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript" />,
    document.getElementById('root')
  );
});

// ReactDOM.render(null, document.getElementById('root'));
