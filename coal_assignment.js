let machinecode="";//variable to store final opcode in binary language

//DECLARED A DICTIONARY OF REGISTERS CONTENTS
let Registers={
    AX:"000B",
    AL:"00",
    AH:"00",
    BX:"0000",
    BL:"99",
    BH:"12",
    CX:"0000",
    CL:"00",
    CH:"00",
    DX:"0000",
    DL:"00",
    DS:"00",
    SI:"0000",
    DI:"0000",
    BP:"0000",
    SP:"0000"};

//DECLARED A DICTIONARY OF OPCODES OF INSTRUCTIONS
let Opcodes_Instructions={
    MOV:"100010",
    ADD:"000000",
    SUB:"000101",
    DEC:"111111 1",
    INC:"111111 1",
    NOT:"1111011",
    AND:"001000",
    OR:"000010",
    CBW:"10011000",
    NEG:"1111011",
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
    
    "[0000]":"0001",
    "[0001]":"0000",
    "[0002]":"0000",
    "[0003]":"0000",
    "[0004]":"000A",
    "[0005]":"0000",
    "[0006]":"0000",
    "[0007]":"0000",
    "[0008]":"0000",
    "[0009]":"0000",
    "[000A]":"0000",
    "[000B]":"0000",
    "[000C]":"0000",
    "[000D]":"0000",
    "[000E]":"0000",
    "[000F]":"0000",

}

for (var key in Memory) {
    console.log(key, Memory[key]);
  }

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
function is_Memory(mem_val){
    for(var key in Memory ){
        
        if(mem_val==key){
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
console.log(destination_register);
document.getElementById(destination_register).innerHTML=Registers[destination_register]+"h";
}
else if(is_Memory(source)  ){
Registers[destination_register]=Memory[source];
document.getElementById(destination_register).innerHTML=Registers[destination_register]+"h";
}
else{
    Registers[destination_register]=source;
    document.getElementById(destination_register).innerHTML=Registers[destination_register]+"h";
}

}

function set_Memory(destination_memory,source){
if(is_Register(source)){
Memory[destination_memory]=Registers[source];
document.getElementById(destination_memory).innerHTML=Memory[destination_memory]+"h";}
else{
    Memory[destination_memory]=source;
     document.getElementById(destination_memory).innerHTML=Memory[destination_memory]+"h";
}


}


function Hex_Addition(op1,op2){
    var hexStr = (parseInt(op1, 16) + parseInt(op2, 16)).toString(16);
    hexStr=hexStr.toUpperCase();
    while (hexStr.length < 4) 
    { hexStr = '0' + hexStr; } 
    return hexStr;
}
function Hex_Subtraction(op1,op2){
    
    var hexStr = (parseInt(op1, 16) - parseInt(op2, 16)).toString(16);
    hexStr=hexStr.toUpperCase();
    while (hexStr.length < 4) 
    { hexStr = '0' + hexStr; } 
    return hexStr;
}

function instruction(input){
    console.log(input);

let Inst_op_split=[];//ARRAY TO STORE INSTRUCTION AND OPERANDS
    let arr=input.split(" ");
    console.log(arr[0]);
    console.log(arr[1]);
    arr.forEach(element => {
        Inst_op_split.push(element.toUpperCase());
        
      });

console.log(Inst_op_split);
let op_split=Inst_op_split[1].split(",");//ARRAY TO STORE  OPERANDS
for(element  of op_split){

    console.log(element);
}
var word;
//CHANGING WORD BIT
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
console.log("value of word:",word)

switch(Inst_op_split[0]){


    case "MOV":
        machinecode=machinecode.concat(Opcodes_Instructions.MOV);
            
            if(is_Register(op_split[0]))
            {//if register is destination
                console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                machinecode=machinecode.concat(" 1");//DIRECTION BIT 
                machinecode=machinecode.concat(word);
               
                if(is_Register(op_split[1])){//reg direct addressing
                    
                    machinecode=machinecode.concat(" 11 ");
                  
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[op_split[1]]);
                    set_Register(op_split[0],op_split[1]);
                console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                console.log(machinecode);
                machinecode=" ";
                
                    break;
                }
        
                else if(is_Memory(op_split[1])){//direct addressing
                    console.log(Memory[op_split[1]])
                    console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat("110");
                    console.log(op_split[1]);
                    let hex=op_split[1].substring(1,5);
                    console.log(hex);
                    
                    let a = [];
                    for ( const s2 of hex) {
                    a.push(s2);
                    }
                    console.log(a);
                    let num_1=a[0];
                    console.log(num_1);
                    let num_2=a[1];
                    console.log(num_2);
                    let num_3=a[2];
                    console.log(num_3);
                    let num_4=a[3];
                    console.log(num_4);
                    num_1=parseInt(num_1,16).toString(2);
                    num_1=num_1.padStart(4,'0');
                    console.log(num_1);

                    num_2=parseInt(num_2,16).toString(2);
                    num_2=num_2.padStart(4,'0');
                    console.log(num_2);

                    num_3=parseInt(num_3,16).toString(2);
                    num_3=num_3.padStart(4,'0');
                    console.log(num_3);

                    num_4=parseInt(num_4,16).toString(2);
                    num_4=num_4.padStart(4,'0');
                    console.log(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_3);

                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_1);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_2);
                   
                   set_Register(op_split[0],op_split[1]);
                    console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                    console.log(machinecode);
                    machinecode=" ";
                break;

                }
                
            
                else if(!is_Memory(op_split[1]) && op_split[1].startsWith("[") ){//indirect adressing
                    // console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                    machinecode=machinecode.concat(" 00 ");
                   machinecode=machinecode.concat(reg_code[op_split[0]]);
                    let B=op_split[1].substring(1,3);
                    console.log(B);
                    
                    let C=Registers[B];
                    console.log(C);
                    C=C.padStart(5,'[');
                    C=C.padEnd(6,']');
                    console.log(C);
                    if(is_Memory(C)){
                        console.log(typeof(C));
                        machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[B]);}
                    set_Register(op_split[0],C);
                    console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                    console.log(machinecode);
                    machinecode=" ";
                    break;

                }
                
            }

            else 
            {
                machinecode=machinecode.concat(" 0");//if memory is destination
                if(is_Memory(op_split[0])){//MEMORY DIRECT 
                   console.log("BEFORE VALUE OF MEMORY:",Memory[op_split[0]]);
                machinecode=machinecode.concat(word);
                machinecode=machinecode.concat(" 00 ");
                machinecode=machinecode.concat(reg_code[op_split[1]]);
                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat("110");

                let hex=op_split[0].substring(1,5);
                    console.log(hex);
                    
                    let a = [];
                    for ( const s2 of hex) {
                    a.push(s2);
                    }
                    console.log(a);
                    let num_1=a[0];
                    console.log(num_1);
                    let num_2=a[1];
                    console.log(num_2);
                    let num_3=a[2];
                    console.log(num_3);
                    let num_4=a[3];
                    console.log(num_4);
                    num_1=parseInt(num_1,16).toString(2);
                    num_1=num_1.padStart(4,'0');
                    console.log(num_1);

                    num_2=parseInt(num_2,16).toString(2);
                    num_2=num_2.padStart(4,'0');
                    console.log(num_2);

                    num_3=parseInt(num_3,16).toString(2);
                    num_3=num_3.padStart(4,'0');
                    console.log(num_3);

                    num_4=parseInt(num_4,16).toString(2);
                    num_4=num_4.padStart(4,'0');
                    console.log(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_3);

                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_1);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_2);

                set_Memory(op_split[0],op_split[1]);
                console.log("NEW VALUE OF MEM:",Memory[op_split[0]]);
                console.log(machinecode);
                machinecode=" ";
                break;
                }

                else if(!is_Memory(op_split[0]) && op_split[0].startsWith("[")){//MEMORY INDIRECT
                   
                    machinecode=machinecode.concat(word);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[1]]);
                    let B=op_split[0].substring(1,3);
                    let C=Registers[B];
                   
                    C=C.padStart(5,'[');
                    C=C.padEnd(6,']');
                    console.log("BEFORE VALUE OF MEMORY:",Memory[C]);
                    console.log("VALUE OD C IS:",C);
                    if(is_Memory(C)){
                        machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[B]);}

                   set_Memory(C,op_split[1]);
                console.log("NEW VALUE OF MEM:",Memory[C]);
                console.log(machinecode);
                machinecode=" ";
                    break;

                }
            
            }
        case "ADD":
            machinecode=machinecode.concat(Opcodes_Instructions.ADD);
            if(is_Register(op_split[0])){//if register is destination
                console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                machinecode=machinecode.concat(" 1");//DIRECTION BIT 
                machinecode=machinecode.concat(word);
               
                if(is_Register(op_split[1])){//reg direct addressing
                    
                    machinecode=machinecode.concat(" 11 ");
                  
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[op_split[1]]);
                    var Z=Hex_Addition(Registers[op_split[0]],Registers[op_split[1]])
                    console.log("VALUE OF Z:",Z);
                    set_Register(op_split[0],Z);
                console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                console.log(machinecode);
                machinecode=" ";
                
                    break;
                }
        
                else if(is_Memory(op_split[1])){//direct addressing
                    console.log(Memory[op_split[1]])
                    console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat("110");
                    console.log(op_split[1]);
                    let hex=op_split[1].substring(1,5);
                    console.log(hex);
                    
                    let a = [];
                    for ( const s2 of hex) {
                    a.push(s2);
                    }
                    console.log(a);
                    let num_1=a[0];
                    console.log(num_1);
                    let num_2=a[1];
                    console.log(num_2);
                    let num_3=a[2];
                    console.log(num_3);
                    let num_4=a[3];
                    console.log(num_4);
                    num_1=parseInt(num_1,16).toString(2);
                    num_1=num_1.padStart(4,'0');
                    console.log(num_1);

                    num_2=parseInt(num_2,16).toString(2);
                    num_2=num_2.padStart(4,'0');
                    console.log(num_2);

                    num_3=parseInt(num_3,16).toString(2);
                    num_3=num_3.padStart(4,'0');
                    console.log(num_3);

                    num_4=parseInt(num_4,16).toString(2);
                    num_4=num_4.padStart(4,'0');
                    console.log(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_3);

                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_1);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_2);
                    var Z=Hex_Addition(Registers[op_split[0]],Memory[op_split[1]])
                    console.log("VALUE OF Z:",Z);
                    set_Register(op_split[0],Z);
                   
                    console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                    console.log(machinecode);
                    machinecode=" ";
                break;

                }
                
            
                else if(!is_Memory(op_split[1]) && op_split[1].startsWith("[") ){//indirect adressing
                    // console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                    machinecode=machinecode.concat(" 00 ");
                   machinecode=machinecode.concat(reg_code[op_split[0]]);
                    let B=op_split[1].substring(1,3);
                    console.log(B);
                    
                    let C=Registers[B];
                    console.log(C);
                    C=C.padStart(5,'[');
                    C=C.padEnd(6,']');
                    console.log(C);
                    if(is_Memory(C)){
                        console.log(typeof(C));
                        machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[B]);}
                    var Z=Hex_Addition(Registers[op_split[0]],Memory[C])
                    console.log("VALUE OF Z:",Z);
                    set_Register(op_split[0],Z);
                    
                    console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                    console.log(machinecode);
                    machinecode=" ";
                    break;

                }
                
            }
            else {
                machinecode=machinecode.concat(" 0");//if memory is destination

                if(is_Memory(op_split[0])){//MEMORY DIRECT 
                   console.log("BEFORE VALUE OF MEMORY:",Memory[op_split[0]]);
                machinecode=machinecode.concat(word);
                machinecode=machinecode.concat(" 00 ");
                machinecode=machinecode.concat(reg_code[op_split[1]]);
                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat("110");

                let hex=op_split[0].substring(1,5);
                    console.log(hex);
                    
                    let a = [];
                    for ( const s2 of hex) {
                    a.push(s2);
                    }
                    console.log(a);
                    let num_1=a[0];
                    console.log(num_1);
                    let num_2=a[1];
                    console.log(num_2);
                    let num_3=a[2];
                    console.log(num_3);
                    let num_4=a[3];
                    console.log(num_4);
                    num_1=parseInt(num_1,16).toString(2);
                    num_1=num_1.padStart(4,'0');
                    console.log(num_1);

                    num_2=parseInt(num_2,16).toString(2);
                    num_2=num_2.padStart(4,'0');
                    console.log(num_2);

                    num_3=parseInt(num_3,16).toString(2);
                    num_3=num_3.padStart(4,'0');
                    console.log(num_3);

                    num_4=parseInt(num_4,16).toString(2);
                    num_4=num_4.padStart(4,'0');
                    console.log(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_3);

                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_1);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_2);
                    var Z=Hex_Addition(Memory[op_split[0]],Registers[op_split[1]])
                    console.log("VALUE OF Z:",Z);
                    console.log(op_split[0]);
                    console.log(Z)
                set_Memory(op_split[0],Z);
                console.log("NEW VALUE OF MEM:",Memory[op_split[0]]);
                console.log(machinecode);
                machinecode=" ";
                break;
            }

                else if(!is_Memory(op_split[0]) && op_split[0].startsWith("[")){//MEMORY INDIRECT
                   
                    machinecode=machinecode.concat(word);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[1]]);
                    let B=op_split[0].substring(1,3);
                    let C=Registers[B];
                   
                    C=C.padStart(5,'[');
                    C=C.padEnd(6,']');
                    console.log("BEFORE VALUE OF MEMORY:",Memory[C]);
                    console.log("VALUE OD C IS:",C);
                    if(is_Memory(C)){
                        machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[B]);
                    var Z=Hex_Addition(Memory[C],Registers[op_split[1]])
                    console.log("VALUE OF Z:",Z);

                }
                   set_Memory(C,Z);
                console.log("NEW VALUE OF MEM:",Memory[C]);
                console.log(machinecode);
                machinecode=" ";
                    break;

                }
            
            }

        case "SUB":
            machinecode=machinecode.concat(Opcodes_Instructions.SUB);
            if(is_Register(op_split[0])){//if register is destination
                console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                machinecode=machinecode.concat(" 1");//DIRECTION BIT 
                machinecode=machinecode.concat(word);
               
                if(is_Register(op_split[1])){//reg direct addressing
                    
                    machinecode=machinecode.concat(" 11 ");
                  
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[op_split[1]]);
                    var Z=Hex_Subtraction(Registers[op_split[0]],Registers[op_split[1]])
                    console.log("VALUE OF Z:",Z);
                    set_Register(op_split[0],Z);
                console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                console.log(machinecode);
                machinecode=" ";
                
                    break;
                }
        
                else if(is_Memory(op_split[1])){//direct addressing
                    console.log(Memory[op_split[1]])
                    console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[0]]);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat("110");
                    console.log(op_split[1]);
                    let hex=op_split[1].substring(1,5);
                    console.log(hex);
                    
                    let a = [];
                    for ( const s2 of hex) {
                    a.push(s2);
                    }
                    console.log(a);
                    let num_1=a[0];
                    console.log(num_1);
                    let num_2=a[1];
                    console.log(num_2);
                    let num_3=a[2];
                    console.log(num_3);
                    let num_4=a[3];
                    console.log(num_4);
                    num_1=parseInt(num_1,16).toString(2);
                    num_1=num_1.padStart(4,'0');
                    console.log(num_1);

                    num_2=parseInt(num_2,16).toString(2);
                    num_2=num_2.padStart(4,'0');
                    console.log(num_2);

                    num_3=parseInt(num_3,16).toString(2);
                    num_3=num_3.padStart(4,'0');
                    console.log(num_3);

                    num_4=parseInt(num_4,16).toString(2);
                    num_4=num_4.padStart(4,'0');
                    console.log(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_3);

                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_1);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_2);
                    var Z=Hex_Subtraction(Registers[op_split[0]],Memory[op_split[1]])
                    console.log("VALUE OF Z:",Z);
                    set_Register(op_split[0],Z);
                   
                    console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                    console.log(machinecode);
                    machinecode=" ";
                break;

                }
                
            
                else if(!is_Memory(op_split[1]) && op_split[1].startsWith("[") ){//indirect adressing
                    // console.log("BEFORE VALUE OF REG:",Registers[op_split[0]]);
                    machinecode=machinecode.concat(" 00 ");
                   machinecode=machinecode.concat(reg_code[op_split[0]]);
                    let B=op_split[1].substring(1,3);
                    console.log(B);
                    
                    let C=Registers[B];
                    console.log(C);
                    C=C.padStart(5,'[');
                    C=C.padEnd(6,']');
                    console.log(C);
                    if(is_Memory(C)){
                        console.log(typeof(C));
                        machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[B]);}
                    var Z=Hex_Subtraction(Registers[op_split[0]],Memory[C])
                    console.log("VALUE OF Z:",Z);
                    set_Register(op_split[0],Z);
                    
                    console.log("NEW VALUE OF REG:",Registers[op_split[0]]);
                    console.log(machinecode);
                    machinecode=" ";
                    break;

                }
                
            }
            else {
                machinecode=machinecode.concat(" 0");//if memory is destination

                if(is_Memory(op_split[0])){//MEMORY DIRECT 
                   console.log("BEFORE VALUE OF MEMORY:",Memory[op_split[0]]);
                machinecode=machinecode.concat(word);
                machinecode=machinecode.concat(" 00 ");
                machinecode=machinecode.concat(reg_code[op_split[1]]);
                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat("110");

                let hex=op_split[0].substring(1,5);
                    console.log(hex);
                    
                    let a = [];
                    for ( const s2 of hex) {
                    a.push(s2);
                    }
                    console.log(a);
                    let num_1=a[0];
                    console.log(num_1);
                    let num_2=a[1];
                    console.log(num_2);
                    let num_3=a[2];
                    console.log(num_3);
                    let num_4=a[3];
                    console.log(num_4);
                    num_1=parseInt(num_1,16).toString(2);
                    num_1=num_1.padStart(4,'0');
                    console.log(num_1);

                    num_2=parseInt(num_2,16).toString(2);
                    num_2=num_2.padStart(4,'0');
                    console.log(num_2);

                    num_3=parseInt(num_3,16).toString(2);
                    num_3=num_3.padStart(4,'0');
                    console.log(num_3);

                    num_4=parseInt(num_4,16).toString(2);
                    num_4=num_4.padStart(4,'0');
                    console.log(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_3);

                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_1);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_2);
                    var Z=Hex_Subtraction(Memory[op_split[0]],Registers[op_split[1]])
                    console.log("VALUE OF Z:",Z);
                    console.log(op_split[0]);
                    console.log(Z)
                set_Memory(op_split[0],Z);
                console.log("NEW VALUE OF MEM:",Memory[op_split[0]]);
                console.log(machinecode);
                machinecode=" ";
                break;
            }

                else if(!is_Memory(op_split[0]) && op_split[0].startsWith("[")){//MEMORY INDIRECT
                   
                    machinecode=machinecode.concat(word);
                    machinecode=machinecode.concat(" 00 ");
                    machinecode=machinecode.concat(reg_code[op_split[1]]);
                    let B=op_split[0].substring(1,3);
                    let C=Registers[B];
                   
                    C=C.padStart(5,'[');
                    C=C.padEnd(6,']');
                    console.log("BEFORE VALUE OF MEMORY:",Memory[C]);
                    console.log("VALUE OD C IS:",C);
                    if(is_Memory(C)){
                        machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(reg_code[B]);
                    var Z=Hex_Subtraction(Memory[C],Registers[op_split[1]])
                    console.log("VALUE OF Z:",Z);

                }
                   set_Memory(C,Z);
                console.log("NEW VALUE OF MEM:",Memory[C]);
                console.log(machinecode);
                machinecode=" ";
                    break;

                }
            
            }
        case "INC":
            machinecode=machinecode.concat(Opcodes_Instructions.INC);
            
            if(is_Register(op_split[0])){
                console.log("BEFORE VALUE OF MEMORY:",Registers[op_split[0]]);
                machinecode=machinecode.concat(word);
            //machinecode=machinecode.concat(" 11 ");
            machinecode=machinecode.concat(" ");
            machinecode=machinecode.concat("000");
            
            machinecode=machinecode.concat(reg_code[op_split[0]]);
            machinecode=machinecode.concat(" ");
            var Z=Hex_Addition(Registers[op_split[0]],1)
            
            set_Register(op_split[0],Z);
        console.log("NEW VALUE OF REG:",Registers[op_split[0]]);

            console.log(machinecode);
            machinecode=" ";
        break;}

            else if(is_Memory(op_split[0])){
                console.log("BEFORE VALUE OF MEMORY:",Memory[op_split[0]]);
                //machinecode=machinecode.concat(word);
                //machinecode=machinecode.concat(" 00 ");
                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat("000");
                machinecode=machinecode.concat("110");

                let hex=op_split[0].substring(1,5);
                    console.log(hex);
                    
                    let a = [];
                    for ( const s2 of hex) {
                    a.push(s2);
                    }
                    console.log(a);
                    let num_1=a[0];
                    console.log(num_1);
                    let num_2=a[1];
                    console.log(num_2);
                    let num_3=a[2];
                    console.log(num_3);
                    let num_4=a[3];
                    console.log(num_4);
                    num_1=parseInt(num_1,16).toString(2);
                    num_1=num_1.padStart(4,'0');
                    console.log(num_1);

                    num_2=parseInt(num_2,16).toString(2);
                    num_2=num_2.padStart(4,'0');
                    console.log(num_2);

                    num_3=parseInt(num_3,16).toString(2);
                    num_3=num_3.padStart(4,'0');
                    console.log(num_3);

                    num_4=parseInt(num_4,16).toString(2);
                    num_4=num_4.padStart(4,'0');
                    console.log(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_3);

                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_4);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_1);
                    machinecode=machinecode.concat(" ");
                    machinecode=machinecode.concat(num_2);
                    var Z=Hex_Addition(Memory[op_split[0]],1)
                    console.log("VALUE OF Z:",Z);
                    console.log(op_split[0]);
                    console.log(Z)
                set_Memory(op_split[0],Z);
                console.log("NEW VALUE OF MEM:",Memory[op_split[0]]);
                console.log(machinecode);
                machinecode=" ";
                break;

            }

            else if(!is_Memory(op_split[0]) && op_split[0].startsWith("[")){
                machinecode=machinecode.concat(reg_code[op_split[0]]);
                    let B=op_split[0].substring(1,3);
                    let C=Registers[B];
                   
                    C=C.padStart(5,'[');
                    C=C.padEnd(6,']');
                    console.log("BEFORE VALUE OF MEMORY:",Memory[C]);
                    console.log("VALUE OD C IS:",C);
                    if(is_Memory(C)){
                        machinecode=machinecode.concat(" ");
                    var Z=Hex_Addition(Memory[C],1)
                    console.log("VALUE OF Z:",Z);

                }
                   set_Memory(C,Z);
                console.log("NEW VALUE OF MEM:",Memory[C]);
                console.log(machinecode);
                machinecode=" ";
                    break;

                }

    case "DEC":
        machinecode=machinecode.concat(Opcodes_Instructions.INC);
            
        if(is_Register(op_split[0])){
            console.log("BEFORE VALUE OF MEMORY:",Registers[op_split[0]]);
            machinecode=machinecode.concat(word);
        //machinecode=machinecode.concat(" 11 ");
        machinecode=machinecode.concat(" ");
        machinecode=machinecode.concat("000");
        
        machinecode=machinecode.concat(reg_code[op_split[0]]);
        machinecode=machinecode.concat(" ");
        var Z=Hex_Subtraction(Registers[op_split[0]],1)
        
        set_Register(op_split[0],Z);
    console.log("NEW VALUE OF REG:",Registers[op_split[0]]);

        console.log(machinecode);
        machinecode=" ";
    break;}

        else if(is_Memory(op_split[0])){
            console.log("BEFORE VALUE OF MEMORY:",Memory[op_split[0]]);
            //machinecode=machinecode.concat(word);
            //machinecode=machinecode.concat(" 00 ");
            machinecode=machinecode.concat(" ");
            machinecode=machinecode.concat("000");
            machinecode=machinecode.concat("110");

            let hex=op_split[0].substring(1,5);
                console.log(hex);
                
                let a = [];
                for ( const s2 of hex) {
                a.push(s2);
                }
                console.log(a);
                let num_1=a[0];
                console.log(num_1);
                let num_2=a[1];
                console.log(num_2);
                let num_3=a[2];
                console.log(num_3);
                let num_4=a[3];
                console.log(num_4);
                num_1=parseInt(num_1,16).toString(2);
                num_1=num_1.padStart(4,'0');
                console.log(num_1);

                num_2=parseInt(num_2,16).toString(2);
                num_2=num_2.padStart(4,'0');
                console.log(num_2);

                num_3=parseInt(num_3,16).toString(2);
                num_3=num_3.padStart(4,'0');
                console.log(num_3);

                num_4=parseInt(num_4,16).toString(2);
                num_4=num_4.padStart(4,'0');
                console.log(num_4);
                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat(num_3);

                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat(num_4);
                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat(num_1);
                machinecode=machinecode.concat(" ");
                machinecode=machinecode.concat(num_2);
                var Z=Hex_Subtraction(Memory[op_split[0]],1)
                console.log("VALUE OF Z:",Z);
                console.log(op_split[0]);
                console.log(Z)
            set_Memory(op_split[0],Z);
            console.log("NEW VALUE OF MEM:",Memory[op_split[0]]);
            console.log(machinecode);
            machinecode=" ";
            break;

        }

        else if(!is_Memory(op_split[0]) && op_split[0].startsWith("[")){
            machinecode=machinecode.concat(reg_code[op_split[0]]);
                let B=op_split[0].substring(1,3);
                let C=Registers[B];
               
                C=C.padStart(5,'[');
                C=C.padEnd(6,']');
                console.log("BEFORE VALUE OF MEMORY:",Memory[C]);
                console.log("VALUE OD C IS:",C);
                if(is_Memory(C)){
                    machinecode=machinecode.concat(" ");
                var Z=Hex_Subtraction(Memory[C],1)
                console.log("VALUE OF Z:",Z);

            }
               set_Memory(C,Z);
            console.log("NEW VALUE OF MEM:",Memory[C]);
            console.log(machinecode);
            machinecode=" ";
                break;

            }


            }
    

         
        
        

       
}
function myFunction() {//FUNCTION TO LINK TEXT BOX OF ASSEMBLY LANGUAGE YO INSTRUCTION FUNCTION
    var x=document.getElementById("id1").value;
    instruction(x);
    
    
  }
