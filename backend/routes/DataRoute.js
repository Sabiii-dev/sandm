import express from 'express'
import { foodData, orderData, userData } from '../controller/DataController.js'

const DataRouter = express.Router()

DataRouter.get("/fooddata",foodData)
DataRouter.get("/userdata",userData)
DataRouter.get("/orderdata",orderData)

export default DataRouter