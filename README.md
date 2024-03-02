# pgtune-api

This project is an API that runs [PGTune](https://pgtune.leopard.in.ua/) on [Cloudflare Workers](https://www.cloudflare.com/developer-platform/workers/).

It can be used for automating the tuning of PostgreSQL.

Since it utilizes the source of [PGTune](https://pgtune.leopard.in.ua/), it is easy to stay up-to-date.

## Usage

Make a request by setting values in the query parameters as shown below.

```sh
curl "https://pgtune-api.kobanyan-dev.workers.dev/?totalMemory=16"
```

Refer to the [OpenAPI definition](https://pgtune-api.kobanyan-dev.workers.dev/doc) for details on query parameters.

## Development

### Installation

```sh
bun install
```

### Execution

```sh
bun run dev
```

### Deployment

```sh
bun run deploy
```

### Credits

[PGTune](https://github.com/le0pard/pgtune) by [@le0pard](https://github.com/le0pard).
