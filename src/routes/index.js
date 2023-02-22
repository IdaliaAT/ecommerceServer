import { Router } from 'express'
import { userRouter } from './user/user.js'
import { categoryRouter } from './category/category.js'
import { productRouter } from './product/product.js'
import { addressRouter } from './address/address.js'

const router = Router()

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/address', addressRouter)

export { router }