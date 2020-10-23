import express from 'express';
import { SuccessResponse, InternalErrorResponse } from '../../core/ApiResponse';
import { InternalError } from '../../core/ApiError';

const router = express.Router();

router.get('/', (req, res) => {
    const a = new InternalError('Bir Hata Oluştu');
    const response = new InternalErrorResponse(a.name + ' ' + a.type + ' ' + a.message);
    response.send(res);
});
export default router;