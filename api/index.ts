import * as lib from './lib'
import * as schema from './schema'

export function getUser(config: unknown) {
  return lib.api<
    | lib.StatusedResponse<200, schema.User>
    | lib.StatusedResponse<404, null>
  >(2, n => {
    switch (n) {
      case 0: return { status: 200, data: {
        name: 'myname',
        birthday: new Date().toUTCString(),
      } };
      default: return { status: 404, data: null };
    }
  });
}

export function postUser(config: unknown) {
  return lib.api<
    | lib.StatusedResponse<201, null>
    | lib.StatusedResponse<400, schema.ValidationErrors<keyof schema.User>>
    | lib.StatusedResponse<403, null>
  >(2, n => {
    switch (n) {
      case 0: return { status: 201, data: null };
      case 1: return { status: 403, data: null };
      default: return { status: 400, data: { name: 'name is invalid'} };
    }
  })
}
