# @pankod/refine-core

## 3.35.0

### Minor Changes

-   [#2050](https://github.com/pankod/refine/pull/2050) [`635cfe9fdb`](https://github.com/pankod/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Ability to disable server-side pagination on `useTable` and `useList` hooks.

    **Implementation**

    Added `hasPagination` property to `useTable` to enable/disable pagination. Updated `useList` config with no pagination option. Set `hasPagination` to `false` to disable pagination. `useTable` hook uses the `useList` hook under the hood and propagates the `hasPagination` property to it. Also setting pagination related return values to `undefined` for better type check on the user side.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

## 3.34.2

### Patch Changes

-   Fixed `useImport` `onFinish` twice call bug.

## 3.34.1

### Patch Changes

-   [#2047](https://github.com/pankod/refine/pull/2047) [`0338ce9d6b`](https://github.com/pankod/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `useImport` `onFinish` twice call bug.

## 3.34.0

### Minor Changes

-   Added i18n support for resource names on [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/) hook.

*   Export `RefineProps` and `ResourceProps` type.

### Patch Changes

-   We have fixed texts with translations of default login pages in Material UI and Headless.

## 3.33.0

### Minor Changes

-   [#2030](https://github.com/pankod/refine/pull/2030) [`d96ba1e9c8`](https://github.com/pankod/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d) Thanks [@biskuvit](https://github.com/biskuvit)! - Added i18n support for resource names on [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/) hook.

*   [#1922](https://github.com/pankod/refine/pull/1922) [`12f08ae6a3`](https://github.com/pankod/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export `RefineProps` and `ResourceProps` type.

### Patch Changes

-   [#2029](https://github.com/pankod/refine/pull/2029) [`b257d87fef`](https://github.com/pankod/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184) Thanks [@ozkalai](https://github.com/ozkalai)! - We have fixed texts with translations of default login pages in Material UI and Headless.

## 3.32.0

### Minor Changes

-   Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

-   Add custom route support to `defaultOpenKeys` in `useMenu`

*   Handle the `undefined` case at audit-log logger in data hooks.

-   Remove dashboard item in `useMenu` hook

## 3.31.0

### Minor Changes

-   [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

-   [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Add custom route support to `defaultOpenKeys` in `useMenu`

*   [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Handle the `undefined` case at audit-log logger in data hooks.

-   [#2009](https://github.com/pankod/refine/pull/2009) [`5b893a9bff`](https://github.com/pankod/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Remove dashboard item in `useMenu` hook

## 3.30.0

### Minor Changes

-   Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

-   Add custom route support to `defaultOpenKeys` in `useMenu`

*   Handle the `undefined` case at audit-log logger in data hooks.

## 3.29.2

### Patch Changes

-   Fix hook-inside-hook call in `notificationProvider` setup at `<Refine/>`

## 3.29.1

### Patch Changes

-   [#1973](https://github.com/pankod/refine/pull/1973) [`206540971b`](https://github.com/pankod/refine/commit/206540971b12f3c63765aecb8aec6d506733a569) Thanks [@aliemir](https://github.com/aliemir)! - Fix hook-inside-hook call in `notificationProvider` setup at `<Refine/>`

## 3.29.0

### Minor Changes

-   Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.28.0

### Minor Changes

-   Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.27.0

### Minor Changes

-   Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.26.0

### Minor Changes

-   [#1896](https://github.com/pankod/refine/pull/1896) [`2ba2a96fd2`](https://github.com/pankod/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746) Thanks [@aliemir](https://github.com/aliemir)! - Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.23.2

### Patch Changes

-   [#1873](https://github.com/pankod/refine/pull/1873) [`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc) Thanks [@aliemir](https://github.com/aliemir)! - Removed dummy default values from internal contexts.
    Updated contexts:

    -   Auth
    -   Access Control
    -   Notification
    -   Translation (i18n)
    -   unsavedWarn

    **BREAKING:** `useGetLocale` hook now can return `undefined` instead of a fallback value of `en` in cases of `i18nProvider` being `undefined`.

## 3.23.1

### Patch Changes

-   [`3281378b11`](https://github.com/pankod/refine/commit/3281378b119c698be3ae4ecb3866b40b883494d8) Thanks [@rassie](https://github.com/rassie)! - Fix: Don't "humanize" labels in breadcrumbs

## 3.23.0

### Minor Changes

-   [#1843](https://github.com/pankod/refine/pull/1843) [`31850119e0`](https://github.com/pankod/refine/commit/31850119e069b93f0b5146b039a86e736164383e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add `useBreadcrumb` hook and `Breadrumb` component for `@pankod/refine-antd` package
