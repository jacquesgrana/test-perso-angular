// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_API: "http://localhost:8090/api",
  URL_SIGNIN: "/signin",
  URL_GET_ROLE_BY_USERNAME: "/user/role",
  URL_GET_USER_LIST: "/user/all",
  URL_ANIMAL: "/animal",
  URL_ANIMAL_TYPE: "/animaltype",
  URL_USER: "/user",
  URL_GET_LIST: "/all",
  URL_CREATE: "/create",
  URL_UPDATE: "/update",
  URL_DELETE: "/delete"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
