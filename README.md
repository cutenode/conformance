# Conformance

A module that helps you get insight into licenses included in the SPDX license list.

## Usage

If you just want to see if a specific license ID or license string is conformant:

```js
const conformance = require('conformance')

conformance('MIT')
conformance('ISC OR GPL-2.0-with-GCC-exception')
```

## What

This module will spit out an object at you with a suite of information about a SPDX license expression you pass in. In general, it will look something like this:

```json
{
  "uniqueLicenseIds": [
    "MIT"
  ],
  "spdxLicenseLinks": [
    "https://spdx.org/licenses/MIT.html#licenseText"
  ],
  "spdx": {
    "osi": true,
    "fsf": true,
    "fsfAndOsi": true,
    "deprecated": false
  }
}
```

## API

Current usage looks like this:

```js
const conformance = require('conformance')

conformance(<spdx expression>, [options])
```

Where:

- `<spdx expression`> is a required string.
  - Can be any valid [SPDX license expression](https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60), which will be parsed by [spdx-expression-parse](https://www.npmjs.com/package/spdx-expression-parse).
- `[options]` is an optional object that contains the following properties:
  - `throwOnError`: a `Boolean` that indicates whether or not you want to throw on errors.

## Why

This is something I've wanted to see for a long time. I've personally seen how high of a barrier licensing can be for larger teams. By increasing insight into license strucutre across applications, we can hopefully lower the barrier for further adoption across industries ❤️

## Limitations

- License expression depth is currently limited to three licenses. For example, `MIT AND (CC0-1.0 OR ISC)` is the current maximum depth. This will return 3 licenses, as you'd expect. This isn't a hard limit, it's just the depth that's been written in the context of licenses on npm. To date, I've not seen a license expression that goes futher than this. If this ends up being written, it should just be a recursive function that continues to check regardless of depth.
