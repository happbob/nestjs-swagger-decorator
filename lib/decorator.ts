import {applyDecorators} from "@nestjs/common";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

function BaseSwaggerDecorator(apiSummary: string, successResponseList: ResponseT[], validationList: ResponseT[]) {
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