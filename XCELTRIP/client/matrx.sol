
pragma solidity >=0.4.23 <0.6.0;

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

contract FGMatrix {
    
    using SafeMath for uint256;
    
    struct User {
        uint id;
        address referrer;
        uint partnersCount;
        mapping(uint8 => bool) activeX3Levels;
        mapping(uint8 => bool) activeX6Levels;
        mapping(uint8 => bool) activeX2Levels;
        mapping(uint8 => X3) x3Matrix;
        mapping(uint8 => X6) x6Matrix;
        mapping(uint8 => X2) x2Matrix;
        mapping(uint8 => uint256) holdAmount;
    }
    
    struct X3 {
        address currentReferrer;
        address[] referrals;
        bool blocked;
        uint reinvestCount;
    }
    
    struct X2 {
        address currentReferrer;
        address[] referrals;
        bool blocked;
        uint reinvestCount;
    }
    
    struct X6 {
        address currentReferrer;
        address[] referrals;
        bool blocked;
        uint reinvestCount;
        uint256 RefvID;
    }

    uint8 public constant LAST_LEVEL = 18;
    
    mapping(address => User) public users;
    mapping(uint => address) public idToAddress;
    mapping(uint => address) public userIds;

    uint public lastUserId = 2;
    address public owner;
    address public daily_reward;
    address public weekly_reward;
    address public social_cause;
    address public club1;
    address public club2;
    address public magicalpool;
    
    mapping(uint8 => uint) public levelPrice;
    mapping(uint8 => uint) public blevelPrice;
    mapping(uint8 => uint) public alevelPrice;
    
    mapping(uint8 => mapping(uint256 => address)) public x3vId_number;
    mapping(uint8 => uint256) public x3CurrentvId;
    mapping(uint8 => uint256) public x3Index;
    
    mapping(uint8 => mapping(uint256 => address)) public x2vId_number;
    mapping(uint8 => uint256) public x2CurrentvId;
    mapping(uint8 => uint256) public x2Index;
    
    event Multisended(uint256 value ,address indexed sender,string _type);
    event Airdropped(address indexed _userAddress, uint256 _amount,string _type);
    event Registration(address indexed user, address indexed referrer, uint indexed userId, uint referrerId);
    event Upgrade(address indexed user, address indexed referrer, uint8 matrix, uint8 level);
    event GlobalDeduction(uint256 magicalpool,uint256 owner,uint256 club1,uint256 club2,uint256 daily_reward,uint256 weekly_reward,uint8 _for);
    event NewUserPlace(address indexed user, address indexed referrer, uint8 matrix, uint8 level, uint8 place);
    event BiNarical(address userAddress,address referrerAddress,uint level);
    event UserIncome(address sender ,address receiver,uint256 amount ,string _for);
    event ReEntry(address user,uint8 level);
    
    constructor(address ownerAddress,address _magicalpool,address _club1,address _club2,address _daily_reward,address _weekly_reward,address _social_cause) public {
        magicalpool=_magicalpool;
        club1=_club1;
        club2=_club2;
        daily_reward=_daily_reward;
        weekly_reward=_weekly_reward;
        social_cause=_social_cause;
        owner = ownerAddress;
        
        levelPrice[1] =1100*1e18; 
        levelPrice[2] =400*1e18;
        for(uint8 i=3;i<=LAST_LEVEL;i++){
          levelPrice[i]=levelPrice[i-1]+200*1e18;
        }
        
        blevelPrice[1]=500*1e18;
        for(uint8 j=2;j<=LAST_LEVEL;j++){
        blevelPrice[j]=blevelPrice[j-1]*2;
        }
        
        alevelPrice[1]=100*1e18;
        for(uint8 k=2;k<=LAST_LEVEL;k++){
        alevelPrice[k]=alevelPrice[k-1]*2;
        }
        
       
        User memory user = User({
            id: 1,
            referrer: address(0),
            partnersCount: uint(0)
        });
        
        users[ownerAddress] = user;
        idToAddress[1] = ownerAddress;
        
        for (uint8 i = 1; i <= LAST_LEVEL; i++) {
            x3vId_number[i][1]=owner;
            x3Index[i]=1;
            x3CurrentvId[i]=1;
            
            x2vId_number[i][1]=owner;
            x2Index[i]=1;
            x2CurrentvId[i]=1;
        }
        
        users[ownerAddress].activeX3Levels[1] = true;
        users[ownerAddress].activeX6Levels[1] = true;
        userIds[1] = ownerAddress;
    
        emit Registration(ownerAddress, address(0), users[ownerAddress].id, 0);
        emit Upgrade(ownerAddress, users[ownerAddress].referrer, 1, 1);
        emit Upgrade(ownerAddress, users[ownerAddress].referrer, 2, 1);
    }
    
    function() external payable {}

    function registrationExt(address referrerAddress) external payable {
        registration(msg.sender, referrerAddress);
    }
    
    function registration(address userAddress, address referrerAddress) private {
        require(msg.value == levelPrice[1], "registration cost 1100 fess");
        require(!isUserExists(userAddress), "user exists");
        require(isUserExists(referrerAddress), "referrer not exists");
        
        uint32 size;
        assembly {
            size := extcodesize(userAddress)
        }
        require(size == 0, "cannot be a contract");
        
        User memory user = User({
            id: lastUserId,
            referrer: referrerAddress,
            partnersCount: 0
        });
        
        users[userAddress] = user;
        idToAddress[lastUserId] = userAddress;
        
        users[userAddress].referrer = referrerAddress;
        
        users[userAddress].activeX3Levels[1] = true; 
        users[userAddress].activeX6Levels[1] = true;
    
        userIds[lastUserId] = userAddress;
        lastUserId++;
        users[referrerAddress].partnersCount++;

        address(uint160(referrerAddress)).transfer(240*1e18);
        emit UserIncome(userAddress,referrerAddress,240*1e18,"Referral Income");
        
        _calculateReferrerReward(240*1e18,referrerAddress,userAddress);
        globalDeduction(600*1e18,1);
        address freeX6Referrer = findFreeX6Referrer(1);
        users[userAddress].x6Matrix[1].currentReferrer = freeX6Referrer;
        updateX6Referrer(userAddress, freeX6Referrer, 1);
        emit Registration(userAddress, referrerAddress, users[userAddress].id, users[referrerAddress].id);
	    emit Upgrade(userAddress, users[userAddress].referrer, 1, 1);
        emit Upgrade(userAddress, users[userAddress].referrer, 2, 1);
    }
    
    function owner_registration(address userAddress, address referrerAddress) public onlyOwner {
        // require(msg.value == levelPrice[1], "registration cost 1100 fess");
        require(!isUserExists(userAddress), "user exists");
        require(isUserExists(referrerAddress), "referrer not exists");
        
        uint32 size;
        assembly {
            size := extcodesize(userAddress)
        }
        require(size == 0, "cannot be a contract");
        
        User memory user = User({
            id: lastUserId,
            referrer: referrerAddress,
            partnersCount: 0
        });
        
        users[userAddress] = user;
        idToAddress[lastUserId] = userAddress;
        
        users[userAddress].referrer = referrerAddress;
        
        users[userAddress].activeX3Levels[1] = true; 
        users[userAddress].activeX6Levels[1] = true;
    
        userIds[lastUserId] = userAddress;
        lastUserId++;
        users[referrerAddress].partnersCount++;
        
        emit UserIncome(userAddress,referrerAddress,240*1e18,"Referral Income");
        
        Owner_calculateReferrerReward(240*1e18,referrerAddress,userAddress);
        Owner_globalDeduction(600*1e18,1);
        address freeX6Referrer = findFreeX6Referrer(1);
        users[userAddress].x6Matrix[1].currentReferrer = freeX6Referrer;
        Owner_updateX6Referrer(userAddress, freeX6Referrer, 1);
        emit Registration(userAddress, referrerAddress, users[userAddress].id, users[referrerAddress].id);
	    emit Upgrade(userAddress, users[userAddress].referrer, 1, 1);
        emit Upgrade(userAddress, users[userAddress].referrer, 2, 1);
    }
    
    modifier onlyOwner() {
        require(owner == msg.sender, 'Ownable: caller is not the owner');
        _;
    }

    function updateX6Referrer(address userAddress, address referrerAddress, uint8 level) private {
        require(level<=18,"not valid level");
        if(referrerAddress==userAddress) return ;
        uint256 newIndex=x3Index[level]+1;
        x3vId_number[level][newIndex]=userAddress;
        x3Index[level]=newIndex;
        if(users[referrerAddress].x6Matrix[level].referrals.length < 5) {
          users[referrerAddress].x6Matrix[level].referrals.push(userAddress);
          users[referrerAddress].holdAmount[level]+=blevelPrice[level];
          emit NewUserPlace(userAddress, referrerAddress, 2, level, uint8(users[referrerAddress].x6Matrix[level].referrals.length));

            if(level<18 && users[referrerAddress].holdAmount[level]>=blevelPrice[level+1]&&users[referrerAddress].x6Matrix[level].referrals.length==5)
            {
        
                    //ReEntry deduction in holdAmount
                    users[referrerAddress].holdAmount[level]=users[referrerAddress].holdAmount[level]-blevelPrice[level];
                    users[referrerAddress].x6Matrix[level].referrals = new address[](0);
                    users[referrerAddress].x6Matrix[level].reinvestCount+=1;
                    
                    //Next Pool Upgradation 
                    users[referrerAddress].holdAmount[level]=users[referrerAddress].holdAmount[level]-blevelPrice[level+1];
                    x3CurrentvId[level]=x3CurrentvId[level]+1;  
                    autoUpgrade(referrerAddress, (level+1)); 
                    uint256 _amount= users[referrerAddress].holdAmount[level];
                    //Next Level Upgradation 
                    autoUpgradeLevel(referrerAddress, (level+1));  
                    //bi-noriacal pool user added
                    address freeX2Referrer = findFreeX2Referrer(level);
                    users[userAddress].x2Matrix[level].currentReferrer = freeX2Referrer;
                    updateX2Referrer(referrerAddress, freeX2Referrer, level);
                    emit Upgrade(referrerAddress,freeX2Referrer,3,level);
                    
             
                     // 20% goes to globalDeduction
                    uint256 global_deduct = _amount.mul(20).div(100);
                    globalDeduction(_amount,2);
                     // 10% goes to direct sponcer
                    uint256 direct_sp = _amount.mul(10).div(100);
                    if(users[referrerAddress].referrer!=address(0)){
                        address(uint160(users[referrerAddress].referrer)).transfer(direct_sp);
                        emit UserIncome(referrerAddress,users[referrerAddress].referrer,direct_sp,"Pool Direct Sponcer");
                    }
                    
                  
                    uint256 all_deduction =direct_sp.add(global_deduct);
                    users[referrerAddress].holdAmount[level]=users[referrerAddress].holdAmount[level]-all_deduction;
                    //net holding ammount sent to users
                    address(uint160(referrerAddress)).transfer(users[referrerAddress].holdAmount[level]);
                    emit UserIncome(referrerAddress,referrerAddress,users[referrerAddress].holdAmount[level],"Global Pool");
                    users[referrerAddress].holdAmount[level]=0;
                    emit ReEntry(referrerAddress,level);
                 } 
            if(level==18 && users[referrerAddress].x6Matrix[level].referrals.length==5)
            {
                //REEntry  
                users[referrerAddress].holdAmount[level]=users[referrerAddress].holdAmount[level]-blevelPrice[level];
                users[referrerAddress].x6Matrix[level].referrals = new address[](0);
                users[referrerAddress].x6Matrix[level].reinvestCount+=1;
                //Global Pool Income
                address(uint160(referrerAddress)).transfer(users[referrerAddress].holdAmount[level]);
                emit UserIncome(referrerAddress,referrerAddress,users[referrerAddress].holdAmount[level],"Global Pool");
                users[referrerAddress].holdAmount[level]=0;
            }
        }

        
    }
    
    function Owner_updateX6Referrer(address userAddress, address referrerAddress, uint8 level) private onlyOwner{
        require(level<=18,"not valid level");
        if(referrerAddress==userAddress) return ;
        uint256 newIndex=x3Index[level]+1;
        x3vId_number[level][newIndex]=userAddress;
        x3Index[level]=newIndex;
        if(users[referrerAddress].x6Matrix[level].referrals.length < 5) {
          users[referrerAddress].x6Matrix[level].referrals.push(userAddress);
          users[referrerAddress].holdAmount[level]+=blevelPrice[level];
          emit NewUserPlace(userAddress, referrerAddress, 2, level, uint8(users[referrerAddress].x6Matrix[level].referrals.length));

            if(level<18 && users[referrerAddress].holdAmount[level]>=blevelPrice[level+1]&&users[referrerAddress].x6Matrix[level].referrals.length==5)
            {
        
                    //ReEntry deduction in holdAmount
                    users[referrerAddress].holdAmount[level]=users[referrerAddress].holdAmount[level]-blevelPrice[level];
                    users[referrerAddress].x6Matrix[level].referrals = new address[](0);
                    users[referrerAddress].x6Matrix[level].reinvestCount+=1;
                    
                    //Next Pool Upgradation 
                    users[referrerAddress].holdAmount[level]=users[referrerAddress].holdAmount[level]-blevelPrice[level+1];
                    x3CurrentvId[level]=x3CurrentvId[level]+1;  
                    Owner_autoUpgrade(referrerAddress, (level+1)); 
                    uint256 _amount= users[referrerAddress].holdAmount[level];
                    //Next Level Upgradation 
                    Owner_autoUpgradeLevel(referrerAddress, (level+1));  
                    //bi-noriacal pool user added
                    address freeX2Referrer = findFreeX2Referrer(level);
                    users[userAddress].x2Matrix[level].currentReferrer = freeX2Referrer;
                    Owner_updateX2Referrer(referrerAddress, freeX2Referrer, level);
                    emit Upgrade(referrerAddress,freeX2Referrer,3,level);
                    
             
                     // 20% goes to globalDeduction
                    uint256 global_deduct = _amount.mul(20).div(100);
                    Owner_globalDeduction(_amount,2);
                     // 10% goes to direct sponcer
                    uint256 direct_sp = _amount.mul(10).div(100);
                    if(users[referrerAddress].referrer!=address(0)){
                        // address(uint160(users[referrerAddress].referrer)).transfer(direct_sp);
                        emit UserIncome(referrerAddress,users[referrerAddress].referrer,direct_sp,"Pool Direct Sponcer");
                    }
                    
                  
                    uint256 all_deduction = direct_sp.add(global_deduct);
                    users[referrerAddress].holdAmount[level]=users[referrerAddress].holdAmount[level]-all_deduction;
                    //net holding ammount sent to users
                    // address(uint160(referrerAddress)).transfer(users[referrerAddress].holdAmount[level]);
                    emit UserIncome(referrerAddress,referrerAddress,users[referrerAddress].holdAmount[level],"Global Pool");
                    users[referrerAddress].holdAmount[level]=0;
                    emit ReEntry(referrerAddress,level);
                 } 
            if(level==18 && users[referrerAddress].x6Matrix[level].referrals.length==5)
            {
                //REEntry  
                users[referrerAddress].holdAmount[level]=users[referrerAddress].holdAmount[level]-blevelPrice[level];
                users[referrerAddress].x6Matrix[level].referrals = new address[](0);
                users[referrerAddress].x6Matrix[level].reinvestCount+=1;
                //Global Pool Income
                // address(uint160(referrerAddress)).transfer(users[referrerAddress].holdAmount[level]);
                emit UserIncome(referrerAddress,referrerAddress,users[referrerAddress].holdAmount[level],"Global Pool");
                users[referrerAddress].holdAmount[level]=0;
            }
        }

        
    }
    
    function updateX2Referrer(address userAddress, address referrerAddress, uint8 level) private {
        require(level<=18,"not valid level");
        if(referrerAddress==userAddress) return ;
        uint256 newIndex=x2Index[level]+1;
        x2vId_number[level][newIndex]=userAddress;
        x2Index[level]=newIndex;
        if(users[referrerAddress].x2Matrix[level].referrals.length < 2) {
          users[referrerAddress].x2Matrix[level].referrals.push(userAddress);
          emit NewUserPlace(userAddress, referrerAddress,3, level, uint8(users[referrerAddress].x2Matrix[level].referrals.length));
        }
        if(users[referrerAddress].x2Matrix[level].referrals.length==2){
          users[referrerAddress].x2Matrix[level].referrals= new address[](0); 
          x2CurrentvId[level]=x2CurrentvId[level]+1; 
          address(uint160(referrerAddress)).transfer(alevelPrice[level]*2);
          emit UserIncome(userAddress,referrerAddress,alevelPrice[level]*2,"Bi-Narical Income");
        }

    }
    
    function Owner_updateX2Referrer(address userAddress, address referrerAddress, uint8 level) private onlyOwner{
        require(level<=18,"not valid level");
        if(referrerAddress==userAddress) return ;
        uint256 newIndex=x2Index[level]+1;
        x2vId_number[level][newIndex]=userAddress;
        x2Index[level]=newIndex;
        if(users[referrerAddress].x2Matrix[level].referrals.length < 2) {
          users[referrerAddress].x2Matrix[level].referrals.push(userAddress);
          emit NewUserPlace(userAddress, referrerAddress,3, level, uint8(users[referrerAddress].x2Matrix[level].referrals.length));
        }
        if(users[referrerAddress].x2Matrix[level].referrals.length==2){
          users[referrerAddress].x2Matrix[level].referrals= new address[](0); 
          x2CurrentvId[level]=x2CurrentvId[level]+1; 
        //   address(uint160(referrerAddress)).transfer(alevelPrice[level]*2);
          emit UserIncome(userAddress,referrerAddress,alevelPrice[level]*2,"Bi-Narical Income");
        }

    }
    
    function autoUpgradeLevel(address _user, uint8 level) private {
           users[_user].activeX3Levels[level] = true;
           users[_user].activeX2Levels[level-1]=true;
           users[_user].holdAmount[level-1]=users[_user].holdAmount[level-1]-levelPrice[level];
           users[_user].holdAmount[level-1]=users[_user].holdAmount[level-1]-alevelPrice[level-1];
           
        address(uint160(users[_user].referrer)).transfer(levelPrice[level].mul(40).div(100));
        emit UserIncome(_user,users[_user].referrer,levelPrice[level].mul(40).div(100),"Referral Level Upgrade");
        _calculateReferrerReward(levelPrice[level].mul(40).div(100), users[_user].referrer,_user);
        globalDeduction(levelPrice[level],3);
        emit Upgrade(_user, users[_user].referrer, 1, level);
    }
    
    function Owner_autoUpgradeLevel(address _user, uint8 level) private onlyOwner{
           users[_user].activeX3Levels[level] = true;
           users[_user].activeX2Levels[level-1]=true;
           users[_user].holdAmount[level-1]=users[_user].holdAmount[level-1]-levelPrice[level];
           users[_user].holdAmount[level-1]=users[_user].holdAmount[level-1]-alevelPrice[level-1];
           
        // address(uint160(users[_user].referrer)).transfer(levelPrice[level].mul(40).div(100));
        emit UserIncome(_user,users[_user].referrer,levelPrice[level].mul(40).div(100),"Referral Level Upgrade");
        Owner_calculateReferrerReward(levelPrice[level].mul(40).div(100), users[_user].referrer,_user);
        Owner_globalDeduction(levelPrice[level],3);
        emit Upgrade(_user, users[_user].referrer, 1, level);
    }   
    
    function autoUpgrade(address _user, uint8 level) private {
        users[_user].activeX6Levels[level] = true;
        
        address freeX6Referrer = findFreeX6Referrer(level-1);
        users[_user].x6Matrix[level-1].currentReferrer = freeX6Referrer;
        updateX6Referrer(_user, freeX6Referrer, level-1);
        
        freeX6Referrer = findFreeX6Referrer(level);
        users[_user].x6Matrix[level].currentReferrer = freeX6Referrer;
        updateX6Referrer(_user, freeX6Referrer, level);
        emit Upgrade(_user, freeX6Referrer, 2, level);
    }
    
    function Owner_autoUpgrade(address _user, uint8 level) private onlyOwner{
        users[_user].activeX6Levels[level] = true;
        
        address freeX6Referrer = findFreeX6Referrer(level-1);
        users[_user].x6Matrix[level-1].currentReferrer = freeX6Referrer;
        Owner_updateX6Referrer(_user, freeX6Referrer, level-1);
        
        freeX6Referrer = findFreeX6Referrer(level);
        users[_user].x6Matrix[level].currentReferrer = freeX6Referrer;
        Owner_updateX6Referrer(_user, freeX6Referrer, level);
        emit Upgrade(_user, freeX6Referrer, 2, level);
    }   
    
    function globalDeduction(uint256 holdAmount,uint8 _for) private {
        //magical pool 10%
         address(uint160(magicalpool)).transfer(holdAmount.mul(10).div(100));
        // admin 4%
         address(uint160(owner)).transfer(holdAmount.mul(4).div(100));
         address(uint160(social_cause)).transfer(holdAmount.mul(1).div(100));
         address(uint160(club1)).transfer(holdAmount.mul(1).div(100));
         address(uint160(club2)).transfer(holdAmount.mul(2).div(100));
         address(uint160(daily_reward)).transfer(holdAmount.mul(1).div(100));
         address(uint160(weekly_reward)).transfer(holdAmount.mul(1).div(100));
         emit GlobalDeduction(holdAmount.mul(10).div(100),holdAmount.mul(4).div(100),holdAmount.mul(1).div(100),holdAmount.mul(2).div(100),holdAmount.mul(1).div(100),holdAmount.mul(1).div(100),_for);
        
    }
    
    function Owner_globalDeduction(uint256 holdAmount,uint8 _for) private onlyOwner{
        //magical pool 10%
        //  address(uint160(magicalpool)).transfer(holdAmount.mul(10).div(100));
        // admin 5%
        //  address(uint160(owner)).transfer(holdAmount.mul(5).div(100));
        //  address(uint160(club1)).transfer(holdAmount.mul(1).div(100));
        //  address(uint160(club2)).transfer(holdAmount.mul(2).div(100));
        //  address(uint160(daily_reward)).transfer(holdAmount.mul(1).div(100));
        //  address(uint160(weekly_reward)).transfer(holdAmount.mul(1).div(100));
         emit GlobalDeduction(holdAmount.mul(10).div(100),holdAmount.mul(4).div(100),holdAmount.mul(1).div(100),holdAmount.mul(2).div(100),holdAmount.mul(1).div(100),holdAmount.mul(1).div(100),_for);
        
    } 
    
    function isUserExists(address user) public view returns (bool) {
        return (users[user].id != 0);
    }
    
    function _calculateReferrerReward(uint256 _investment, address _referrer,address sender) private {
	     for(uint8 i=1;i<=18;i++)
	     {
	        if(_referrer!=address(0)){
                address(uint160(_referrer)).transfer(_investment.div(18)); 
                emit UserIncome(sender,_referrer,_investment.div(18),"Level Income");
             if(users[_referrer].referrer!=address(0))
                _referrer=users[_referrer].referrer;
            else
                break;
	         }
	         else{
	            i=18;
	         }
	     }
     }
     
   
   
    function Owner_calculateReferrerReward(uint256 _investment, address _referrer,address sender) private onlyOwner{
	     for(uint8 i=1;i<=18;i++)
	     {
	        if(_referrer!=address(0)){
                // address(uint160(_referrer)).transfer(_investment.div(18)); 
                emit UserIncome(sender,_referrer,_investment.div(18),"Level Income");
             if(users[_referrer].referrer!=address(0))
                _referrer=users[_referrer].referrer;
            else
                break;
	         }
	         else{
	            i=18;
	         }
	     }
     }
     
    function findFreeX3Referrer(address userAddress, uint8 level) public view returns(address) {
        while (true) {
            if (users[users[userAddress].referrer].activeX3Levels[level]) {
                return users[userAddress].referrer;
            }
            
            userAddress = users[userAddress].referrer;
        }
    }
    
    function findFreeX6Referrer(uint8 level) public view returns(address){
        uint256 id=x3CurrentvId[level];
        return x3vId_number[level][id];
    }
    
    function findFreeX2Referrer(uint8 level) public view returns(address){
        uint256 id=x2CurrentvId[level];
        return x2vId_number[level][id];
    }

    function usersActiveX3Levels(address userAddress, uint8 level) public view returns(bool) {
        return users[userAddress].activeX3Levels[level];
    }

    function usersActiveX6Levels(address userAddress, uint8 level) public view returns(bool) {
        return users[userAddress].activeX6Levels[level];
    }

    function usersActiveX2Levels(address userAddress, uint8 level) public view returns(bool) {
        return users[userAddress].activeX2Levels[level];
    }

    function usersX3Matrix(address userAddress, uint8 level) public view returns(address, address[] memory, bool,uint256) {
        return (users[userAddress].x3Matrix[level].currentReferrer,
                users[userAddress].x3Matrix[level].referrals,
                users[userAddress].x3Matrix[level].blocked,
                users[userAddress].x3Matrix[level].reinvestCount
                );
    }
    
    function usersX6Matrix(address userAddress, uint8 level) public view returns(address, address[] memory, bool,uint256) {
        return (users[userAddress].x6Matrix[level].currentReferrer,
                users[userAddress].x6Matrix[level].referrals,
                users[userAddress].x6Matrix[level].blocked,
                users[userAddress].x6Matrix[level].reinvestCount);
    }
    
    function usersX2Matrix(address userAddress, uint8 level) public view returns(address, address[] memory, bool,uint256) {
        return (users[userAddress].x2Matrix[level].currentReferrer,
                users[userAddress].x2Matrix[level].referrals,
                users[userAddress].x2Matrix[level].blocked,
                users[userAddress].x2Matrix[level].reinvestCount);
    }
    
    function multisendTRX(address payable[]  memory  _contributors, uint256[] memory _balances,string memory _type) public payable {
    require(msg.sender==club1||msg.sender==club2||msg.sender==magicalpool||msg.sender==daily_reward||msg.sender==weekly_reward||msg.sender==owner,"not in fee wallet");
        uint256 total = msg.value;
        uint256 i = 0;
        for (i; i < _contributors.length; i++) {
            require(total >= _balances[i]);
            total = total.sub(_balances[i]);
            _contributors[i].transfer(_balances[i]);
        }
        emit Multisended(msg.value, msg.sender, _type);
    }
    
    function airDropTRX(address payable[]  memory  _userAddresses, uint256 _amount,string memory _type) public payable {
        require(msg.sender==club1||msg.sender==club2||msg.sender==magicalpool||msg.sender==daily_reward||msg.sender==weekly_reward||msg.sender==owner,"not in fee wallet");
        require(msg.value == _userAddresses.length.mul((_amount)));
        
        for (uint i = 0; i < _userAddresses.length; i++) {
            _userAddresses[i].transfer(_amount);
            emit Airdropped(_userAddresses[i], _amount, _type);
        }
    }
    
    function withdraw(uint256 amt,address payable adr) public payable onlyOwner{
        adr.transfer(amt);
    }
    
    function ChangeWallet(address adr,uint8 _type) public payable onlyOwner{

        if(_type==1)
        magicalpool=adr;
        else if(_type==2)
        club1=adr;
        else if(_type==3)
        club2=adr;
        else if(_type==4)
        daily_reward=adr;
        else if(_type==5)
        weekly_reward=adr;
        else if(_type==6)
        owner =adr;
        else if(_type==7)
        social_cause=adr;
    }
    
    function bytesToAddress(bytes memory bys) private pure returns (address addr) {
        assembly {
            addr := mload(add(bys, 20))
        }
    }
    
}