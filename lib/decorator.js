"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function BaseSwaggerDecorator(apiSummary, successResponseList, validationList) {
    const successResponseDecorators = [], validationResponseDecorators = [];
    for (let successData of successResponseList) {
        successData.type ?
            successResponseDecorators.push((0, swagger_1.ApiResponse)({
                status: successData.code,
                description: successData.message,
                type: successData.type
            })) :
            successResponseDecorators.push((0, swagger_1.ApiResponse)({
                status: successData.code,
                description: successData.message,
            }));
    }
    for (let validationData of validationList) {
        validationResponseDecorators.push((0, swagger_1.ApiResponse)({
            status: validationData.code,
            description: validationData.message,
        }));
    }
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: apiSummary }), ...successResponseDecorators, ...validationResponseDecorators);
}
