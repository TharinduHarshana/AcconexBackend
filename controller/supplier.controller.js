const SupplierModel=require("../models/supplier.model");
const mongoose=require("mongoose");


//create supplier
async function addSupplier(req,res){
  try {
      const{supplierId,firstName,companyName,phoneNumber,email}=req.body;
      if(!supplierId|| !firstName|| !companyName|| !phoneNumber){
          return res.status(400).json({ msg: "All fields are required" });
      }
      const newSupplier=await SupplierModel.create({
         supplierId,firstName,companyName,phoneNumber,email
      });
      console.log("New supplier added",newSupplier);
      res.status(200).json({success:true,data:newSupplier})
  } catch (error) {
      console.log(error);
      res.status(500).json({success:false,message:"Server Error"})
      
  }
}
//get suppliers
const getSuppliers=async function getSupplier(req,res){
    try {
        const suppliers = await SupplierModel.find().populate('items');
        res.status(200).json({ success: true, data: suppliers });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
      }

}
//get supplier data by id
const getSupplierById=async function getSupplierId(req,res){
    try {
        const supplier=await SupplierModel.findById({_id:req.params.id});
        res.status(200).json({success:true, data:supplier})
    } catch (err) {
        console.log(err);
        res.status(500).json({success:false,message:"Server Error"})
    }
  
  }

  //check supplier id
  async function checkSupplierId(req,res){
    try {
      const supplierExist = await SupplierModel.findOne({ supplierId: req.params.supplierId });
      if (supplierExist) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
   }
  }

//update supplier
  const updateSupplierById = async function updateSupplier(req, res) {
    try {
      const _id = req.params.id; // Extracting user ID from the URL path
      const {firstName,companyName,phoneNumber,email} = req.body;
      const updateSupplierData = {firstName,companyName,phoneNumber,email};
  
      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid user ID" });
      }
  
      // Find the user by ID and update it
      const updateSupData = await SupplierModel.findByIdAndUpdate(_id, updateSupplierData, {
        new: true,
      });
  
      if (!updateSupData) {
        return res
          .status(404)
          .json({ success: false, message: "Supplier not found" });
      }
  
      res.status(200).json({ success: true, data: updateSupData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  //delete suppliers
  const deleteSupplierById = async (req, res) => {
    try {
      const deleteSupplierById = await SupplierModel.findByIdAndDelete(req.params._id);
  
      if (!deleteSupplierById)
        return res
          .status(404)
          .json({ success: false, message: "Supplier not found" });
  
      res
        .status(200)
        .json({ success: true, message: "Supplier Deleted Successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to delete item",
        error: err.message,
      });
    }
  };
  
module.exports={addSupplier,getSuppliers,getSupplierById,checkSupplierId,updateSupplierById,deleteSupplierById};