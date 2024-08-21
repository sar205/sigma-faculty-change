const mongoose = require('mongoose');

const PlannerSchema = new mongoose.Schema({
    srno: { type: Number },           
    nameOfTopic: { type: String },     
    hoursAlloted: { type: Number },    
    plannedDate: { type: Date },       
    actualDate: { type: Date },                        
    teachingAidCode: { type: String }, 
    remarks: { type: String },                       
    unit: { type: String },            
    planner: { type: String },         
    token: { type: String },
    erp:{type : String},
    subjectCode:{type : String},
    enter:{type:Boolean , default:false}           
});

module.exports = mongoose.model('Planner', PlannerSchema);
