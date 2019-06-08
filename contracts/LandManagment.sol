      pragma solidity ^0.5.0;
      pragma experimental ABIEncoderV2;



      contract LandManagment{

          uint totalUsers = 1;
          uint totalLands = 0;

          struct User{
              string username;
              string password;
              address userid;
              bool isAdmin;
          }

          struct Land{
              uint landId;
              string landName;
              address ownerAddress;
          }

          mapping(uint => User) users;
          mapping(uint => Land) lands;

          //constructor function
          constructor() public{
              users[0] = User("arjun","tops?123",msg.sender,true);
          }

          function addUser(string memory username,string memory password, address userid, bool isAdmin) public{
              users[totalUsers] = User(username,password,userid,isAdmin);
              totalUsers = totalUsers +1;
          }

          function getAllUsers() public returns(address[] memory, string[] memory){
              address[] memory allAddress = new address[](totalUsers);
              string[] memory allUsernames = new string[](totalUsers);
              for(uint x=0; x < totalUsers; x++){
                  if(users[x].isAdmin == false){
                    allAddress[x] = users[x].userid;
                    allUsernames[x] = users[x].username;
                  }
              }
              return (allAddress,allUsernames);

          }

          function createLand(string memory landName, address ownerAddress) public{
              lands[totalLands] = Land(totalLands, landName, ownerAddress);
              totalLands= totalLands+1;
          }

          function getLandByUser(address ownerAddress) public returns(uint[] memory) {
              uint[] memory allLendsBySpecifUser = new uint[](totalLands);
              uint z = 0;
                for(uint y=0; y<totalLands; y++){
                    if(lands[y].ownerAddress == ownerAddress){
                        allLendsBySpecifUser[z] = y;
                        z = z+1;
                    }
                }
               return allLendsBySpecifUser;
          }

          function getLandName(uint landId) public returns(string memory){
              for(uint y=0; y<totalLands; y++){
                    if(lands[y].landId == landId){
                        return lands[y].landName;
                    }
                }
          }

          function transferLand(address userAddress, uint landId) public{
              lands[landId].ownerAddress = userAddress;
          }

          function checkIfUserExists(string memory username,string memory password) public returns(bool){
              for(uint o=0; o<totalUsers; o++){
                  if(keccak256(abi.encodePacked(users[o].username)) == keccak256(abi.encodePacked(username))){
                    if(keccak256(abi.encodePacked(users[o].password)) == keccak256(abi.encodePacked(password))){
                          return true;
                      }else{
                          return false;
                      }
                  }else{
                      return false;
                  }
              }
          }

      }