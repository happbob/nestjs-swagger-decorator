export interface ResponseT {
    // success or not
    // ex) true
    isSuccess: boolean,

    // api status code
    // ex) 1000
    code: number,

    // describe api result
    // ex) Missing Category Id.
    message: string,

    // deliver result data object
    result?: any,

    // check result type
    type?: any
}