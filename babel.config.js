module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // Assurez-vous que cette ligne est à l'intérieur de l'objet retourné
  };
};
