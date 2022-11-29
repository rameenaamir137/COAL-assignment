let machinecode="";//variable to store final opcode

//DECLARED A DICTIONARY OF REGISTERS CONTENTS
let Registers={
    AX:"0000",
    BX:"1110",
    CX:"0000",
    DX:"0000",
    SI:"0000",
    DI:"0000",
    BP:"0000",
    SP:"0000"};

//DECLARED A DICTIONARY OF OPCODES OF INSTRUCTIONS
let Opcodes_Instructions={
    MOV:"100010",ADD:"000000",SUB:"000101",DEC:"1111111",INC:"1111111",NOT:"1111011",
    AND:"001000",OR:"000010",CBW:"10011000",NEG:"1111011",
}

//DECLARED A DICTIONARY OF REGISTERS_CODES
let reg_code={
    AX:"000",
    AL:"000",
    AH:"000",
    BX:"011",
    BL:"011",
    BH:"011",
    CX:"001",
    CL:"001",
    CH:"001",
    DX:"010",
    DL:"010",
    DH:"010",
    SI:"110",
    DI:"111",
    BP:"101",
    SP:"100"
}

//DECLARED A DICTIONARY OF MEMORY CONTENTS
let Memory={
    
    "[00000]":"0000",
    "[00001]":"0000",
    "[00002]":"0000",
    "[00003]":"0000",
    "[00004]":"5817",
    "[00005]":"0000",
    "[00006]":"0000",
    "[00007]":"0000",
    "[00008]":"0000",
    "[00009]":"0000",
    "[0000A]":"0000",
    "[0000B]":"0000",
    "[0000C]":"0000",
    "[0000D]":"0000",
    "[0000E]":"0000",
    "[0000F]":"0000",

}
let mem_code={
    "[00000]":"0000",
    "[00001]":"0001",
    "[00010]":"0010",
    "[00011]":"0011",
    "[00100]":"0100",
    "[00101]":"0101",
    "[00110]":"0110",
    "[00111]":"0111",
    "[01000]":"1000",
    "[01001]":"1001",
    "[01010]":"1010",
    "[01011]":"1011",
    "[01100]":"1100",
    "[01101]":"1101",
    "[01110]":"1110",
    "[01111]":"1111",

}
// for (var key in Memory) {
//     console.log(key, Memory[key]);
//   }

//FUNCTION TO CHECK IF VALID REGISTER
function is_Register(reg_value){

    for(var key in Registers ){

        if(reg_value.toUpperCase()==key 
        || reg_value.toUpperCase()=="AL"
        || reg_value.toUpperCase()=="BL"
        || reg_value.toUpperCase()=="CL"
        || reg_value.toUpperCase()=="DL" 
        ||  reg_value.toUpperCase()=="AH"
        || reg_value.toUpperCase()=="BH"
        || reg_value.toUpperCase()=="CH"
        || reg_value.toUpperCase()=="DH")
        {

           return true;
        }

    }
    return false;
}


//FUNCTION TO CHECK IF VALID MEMORY LOCATION
function is_Memory(mem_val)
{
    for(var key in Memory )
    {
        
        if(mem_val==key)
        {
           return true;
        }

    }
    return false;
}

//FUNCTION TO CHECK IF VALID INSTRUCTION
function is_Instruction(Inst_op_split){
    for(var key in Opcodes_Instructions ){
        if(Inst_op_split[0]==key){
           return true;
        }

    }
    return false;

}
function set_Register( destination_register,source){
if(is_Register(source)){
Registers[destination_register]=Registers[source];
}
else if(is_Memory(source)  ){
Registers[destination_register]=Memory[source];
}

}

function set_Memory(destination_memory,source_register){
Memory[destination_memory]=Registers[source_register];
}
//TAKING INPUT FROM USER
let input=window.prompt("ENTER THE CODE IN ASSEMBLY LANGUAGE");


function instruction(input){
let Inst_op_split=input.split(" ");//ARRAY TO STORE INSTRUCTION AND OPERANDS
let op_split=Inst_op_split[1].split(",");//ARRAY TO STORE  OPERANDS
    //TAKING INPUT FROM USER


// let array1=input.split(" ")//SPLITTONG ASSEMBLY CODE ON BASIS OF SPACES
// let array2=array1[1].split(",");//SPLITTONG ASSEMBLY CODE ON BASIS OF COMMAS

// //PUSHING VALUES IN INS_OP_SPLIT ARRAY
// for (var i of array1) {
//     Inst_op_split.push(i);
// }
// //PUSHING VALUES IN OP_SPLIT ARRAY
// for (var i of array2) {
//     op_split.push(i);
// }

switch(Inst_op_split[0]){

    case "MOV":
        machinecode=machinecode.concat(Opcodes_Instructions.MOV);
        //for(var i of op_split)
    
       
            let word;
            if(op_split[0]== "AX" || op_split[0]== "BX" ||op_split[0]== "CX" || op_split[0]== "DX"){
                word=1;

            }
            else if(op_split[0]== "AL" || op_split[0]== "BL" ||op_split[0]== "CL" || op_split[0]== "DL"  || op_split[0]=="AH"
            ||op_split[0]=="BH"
            || op_split[0]=="CH"
            || op_split[0]=="DH"){
                word=0;
            }
            if(op_split[1]== "AX" || op_split[1]== "BX" ||op_split[1]== "CX" || op_split[1]== "DX"){
                word=1;
            }
            else if(op_split[1]== "AL" || op_split[1]== "BL" ||op_split[1]== "CL" || op_split[1]== "DL"  || op_split[0]=="AH"
            ||op_split[1]=="BH"
            || op_split[1]=="CH"
            || op_split[1]=="DH"){
                word=0;
            }
            //console.log("value of word:",word)
            
            if(is_Register(op_split[0])){//if register is destination
                //console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                machinecode=machinecode.concat(" 1");//DIRECTION BIT 
                machinecode=machinecode.concat(word);
               
                if(is_Register(op_split[1])){//reg direct addressing
                    
                    machinecode=machinecode.concat(" 11 ");
                  
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[op_split[1]]);
                    set_Register(op_split[0],op_split[1]);
                //console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                    break;
                }
        
                else if(is_Memory(op_split[1])){//direct addressing
                    //console.log(Memory[op_split[1]])
                    //console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(mem_code[op_split[1]]);
                    set_Register(op_split[0],op_split[1]);
                    //console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                break;

                }
                
            
                else if(!is_Memory(op_split[1]) && op_split[1].startsWith("[") ){//indirect adressing
                    //console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    let B=op_split[1].substring(1,3);
                    let C=Registers[B];
                    C=C.padStart(5, '0');
                    C=C.padStart(6,'[');
                    C=C.padEnd(7,']');
                    //console.log(C);
                    if(is_Memory(C)){
                        machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(mem_code[C]);}
                    set_Register(op_split[0],C);
                    //console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                    break;

                }
                
            }
            else {
                machinecode=machinecode.concat(" 0");//if memory is destination
                if(is_Memory(op_split[0])){//MEMORY DIRECT 
                   //console.log("BEFORE VALUE OF MEMORY:",Memory[op_split[0]]);
                machinecode=machinecode.concat(word);
                machinecode=machinecode.concat(" 00 ");
                machinecode=machinecode.concat(reg_code[op_split[1]]);
                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat(mem_code[op_split[0]]);
                set_Memory(op_split[0],op_split[1]);
                //console.log("NEW VALUE OF MEM:",Memory[op_split[0]])
            }

                else if(!is_Memory(op_split[0]) && op_split[0].startsWith("[")){//MEMORY INDIRECT
                   
                    machinecode=machinecode.concat(word);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[1]]);
                    let B=op_split[0].substring(1,3);
                    let C=Registers[B];
                    C=C.padStart(5, '0');
                    C=C.padStart(6,'[');
                    C=C.padEnd(7,']');
                    //console.log("BEFORE VALUE OF MEMORY:",Memory[C]);
                    console.log("VALUE OD C IS:",C);
                    if(is_Memory(C)){
                        machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(mem_code[C]);}
                   set_Memory(C,op_split[1]);
                //console.log("NEW VALUE OF MEM:",Memory[C]);
                    break;

                }
            
            }
        }
}


instruction(input);
console.log(machinecode);
