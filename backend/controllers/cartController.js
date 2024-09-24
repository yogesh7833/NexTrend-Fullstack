

//add products to usercart

import { response } from "express";
import userModel from "../models/userModel.js"

// const addToCart = async (req, res) => {
//     try {
//       const { userId, itemId, size } = req.body;
  
//       // Fetch user data
//       const userData = await userModel.findById(userId);
  
//       // Ensure user data exists
//       if (!userData) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
  
//       let cartData = userData.cartData || {}; // Ensure cartData exists
  
//       // Check if item exists in cart and update accordingly
//       if (cartData[itemId]) {
//         if (cartData[itemId][size]) {
//           cartData[itemId][size] += 1; // If size exists, increment quantity
//         } else {
//           cartData[itemId][size] = 1;  // If size does not exist, initialize quantity
//         }
//       } else {
//         cartData[itemId] = {};
//         cartData[itemId][size] = 1;    // Initialize item and size
//       }
  
//       // Update user cart data in the database
//       await userModel.findByIdAndUpdate(userId, { cartData });
  
//       // Send a successful response
//       res.json({
//         success: true,
//         message: "Added to cart",
//       });
  
//     } catch (error) {
//       // Log the error and send a failure response
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         message: error.message,  // Corrected typo from messgae to message
//       });
//     }
//   };

const addToCart=async(req,res)=>{
   try {
    const {userId,itemId,size}=req.body
     
    const userData=await userModel.findById(userId);
    let  cartData=await userData.cartData;
     if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1;  //if available then only increase by one
        }else{
            cartData[itemId][size]=1;
        }
     }else{
        cartData[itemId]={}
        cartData[itemId][size]=1
     }

     await userModel.findByIdAndUpdate(userId, {cartData})

     res.json({
        success:true,
        message:"Added to cart",
     })
    
   } catch (error) {
      console.log(error);
      res.json({
        success:false,
        messgae:error.message,
      })
   }

}
  
//update user cart
const updateCart=async(req,res)=>{
   try {
      const {userId, itemId, size, quantity}=req.body;

      const userData=await userModel.findById(userId);
      let  cartData=await userData.cartData;

      cartData[itemId][size]=quantity;
       
      await userModel.findByIdAndUpdate(userId, {cartData})

      res.json({
        success:true,
        messgae:" Cart Update",
     })

   } catch (error) {
    console.log(error);
      res.json({
        success:false,
        messgae:error.messgae,
      })
   }

}

   //get user cart data
const getUserCart=async(req,res)=>{
    
    try {
        const {userId}=req.body;
          
        const userData=await userModel.findById(userId);
        let  cartData=await userData.cartData;

        res.json({
            success:true,
            cartData,
        })

    } catch (error) {
        console.log(error);
      res.json({
        success:false,
        messgae:error.messgae,
      })
    }

}

export {addToCart,updateCart,getUserCart}