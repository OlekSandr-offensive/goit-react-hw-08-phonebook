import React from 'react';

const styles = {
  container: {
    minHeight: 'calc(100vh - 50px)',
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
        Головна сторінка нашого сервісу{' '}
        <span role="img" aria-label="Картинка вітання">
          😎
        </span>
      </h1>
    </div>
  );
};

export default HomeView;
