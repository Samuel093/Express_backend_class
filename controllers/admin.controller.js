import adminModel from "../models/admin.model";


const fetchAdmin = async (req, res)=>{
      try {
    const admin = await adminModel.find()
    if(!admin.length === 0){
        res.status(404).json({
            message: 'No admin found in database'
        })
    }
    return res.status(200).json({
          message: "All admins successfully fetched",
          data: admin
    })
  } catch (error) {
      return res.status(500).json({
        message: error.message
      })
  }
}

export { fetchAdmin }