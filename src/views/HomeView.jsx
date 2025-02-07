import React from 'react';

const styles = {
  container: {
    minHeight: 'calc(100vh /2)',
    display: 'flex',
    alingItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
};

const HomeView = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        The main page of our service{' '}
        <span role="img" aria-label="Greeting picture">
          😎
        </span>
      </h1>
    </div>
  );
};

export default HomeView;
