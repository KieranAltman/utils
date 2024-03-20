## Providers

### Pinata Provider

```js
// Initialize first
initPinataProvider({ apiKey: "xxx", secretApiKey: "xxx" });
// or
initPinataProvider("PinataJWTKey");

// Use provider anywhere
const provider = getPinataProvider();
```

### Aleo Provider

```js
initAleoProvider();
initAleoProvider(url);

const provider = getAleoProvider();
```

## Formatters

- formatUnits
- formatEther
- formatAleo
