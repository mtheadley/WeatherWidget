import type { IFetchRequest } from '@/models/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAPIStore = defineStore('api', () => {
  const isBusy = ref(false)
  let activeFetchRequests = 0

  async function callAPI<T>(fetchRequest: IFetchRequest): Promise<T> {
    //allow for multiple concurrent api calls
    activeFetchRequests++
    isBusy.value = true

    // if (!fetchRequest.fetchOptions) {
    //   fetchRequest.fetchOptions = {};
    // }
    // fetchRequest!.fetchOptions.headers = new Headers({ "content-type": "application/json" });

    let errorHandled = false

    console.log('Calling url: ' + fetchRequest.url)

    return fetch(fetchRequest.url, fetchRequest.fetchOptions)
      .catch(async (ex) => {
        //failure fetch response
        activeFetchRequests--
        isBusy.value = activeFetchRequests > 0

        if (!errorHandled && fetchRequest.errorMessage) {
          errorHandled = true
          console.error(fetchRequest.errorMessage)
        }

        //bubble promise failure
        throw ex
      })
      .then(async (res) => {
        //successful fetch response
        activeFetchRequests--
        isBusy.value = activeFetchRequests > 0
        if (!res.ok) {
          //fail promise with body message as error
          throw await res
            .json()
            .then((jsonErrorBody: { message?: string; errorMessage?: string }) => {
              //unhandled server exceptions return message with full stack trace
              //known server exceptions return errorMessage
              return new Error(jsonErrorBody.message || jsonErrorBody.errorMessage)
            })
            .catch(() => {
              return new Error(`A non-2xx status code of ${res.status} was returned`)
            })
        }

        //success
        return fetchRequest.raw
          ? res
          : await res.text().then((data) => (data.length === 0 ? null : JSON.parse(data)))
      })
      .catch((ex: Error) => {
        if (!errorHandled) {
          //error not handled above, so display message
          console.error(ex.message)
        }

        //bubble promise failure
        throw ex
      })
  }

  return {
    isBusy,
    callAPI
  }
})
