import {ResponseT} from "./response.t";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {applyDecorators} from "@nestjs/common";


export const BaseSwaggerDecorator = (apiSummary: string, successResponseList: ResponseT[], validationList: ResponseT[]) => {
    const successResponseDecorators = [], validationResponseDecorators = [];

    for (let successData of successResponseList){
        successData.type ?
            successResponseDecorators.push(
                ApiResponse({
                    status: successData.code,
                    description: successData.message,
                    type: successData.type
                })
            ) :
            successResponseDecorators.push(
                ApiResponse({
                    status: successData.code,
                    description: successData.message,
                })
            )
    }

    for (let validationData of validationList){
        validationResponseDecorators.push(
            ApiResponse({
                status: validationData.code,
                description: validationData.message,
            })
        )
    }

    return applyDecorators(
        ApiOperation({ summary: apiSummary }),
        ...successResponseDecorators,
        ...validationResponseDecorators,
    )
}