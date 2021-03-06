//These are the token IDs that were minted in the Founders Series. We can use this list to trim the output results since we no longer need to enumerate every possible cat as we had to do before they were minted.
var existingTokens = [10012, 10022, 10023, 10031, 10032, 10042, 10043, 10051, 10061, 10062, 10071, 10072, 10092, 10102, 10111, 10112, 10121, 10122, 10128, 10132, 10142, 10151, 10152, 10153, 10162, 10171, 10172, 10173, 10181, 10182, 10191, 10192, 10201, 10203, 10211, 10221, 10222, 10231, 10232, 10241, 10242, 10251, 10252, 10261, 10262, 10271, 10272, 10273, 10281, 10282, 10283, 10291, 10302, 10311, 10312, 10331, 10332, 10341, 10351, 10352, 10361, 10371, 10372, 10373, 10381, 10382, 10391, 10392, 10393, 10401, 10402, 10403, 10405, 10411, 10413, 10422, 10431, 10441, 10442, 10443, 10451, 10452, 10453, 10455, 10461, 10462, 10472, 10473, 10482, 10491, 10495, 10501, 10511, 10512, 10521, 10522, 10531, 10532, 10533, 10541, 10551, 10552, 10555, 10561, 10571, 10572, 10581, 10582, 10591, 10592, 10601, 10603, 10611, 10615, 10621, 10622, 10631, 10632, 10641, 10651, 10652, 10653, 10661, 10662, 10671, 10672, 10673, 10681, 10682, 10683, 10691, 10692, 10701, 10702, 10711, 10712, 10721, 10722, 10731, 10741, 10742, 10751, 10752, 10753, 10765, 10781, 10791, 10861, 10882, 10892, 10901, 10933, 10971, 10981, 20011, 20012, 20021, 20023, 20028, 20031, 20032, 20041, 20042, 20043, 20051, 20052, 20053, 20061, 20065, 20071, 20081, 20082, 20091, 20092, 20101, 20102, 20103, 20111, 20112, 20121, 20122, 20131, 20132, 20141, 20151, 20152, 20172, 20181, 20182, 20191, 20192, 20195, 20201, 20211, 20212, 20221, 20223, 20231, 20232, 20233, 20241, 20242, 20243, 20251, 20252, 20261, 20262, 20271, 20272, 20282, 20291, 20301, 20302, 20311, 20312, 20321, 20322, 20323, 20331, 20341, 20342, 20351, 20352, 20361, 20362, 20371, 20372, 20373, 20378, 20381, 20391, 20392, 20401, 20402, 20403, 20411, 20412, 20421, 20425, 20431, 20433, 20441, 20442, 20451, 20452, 20461, 20471, 20472, 20481, 20491, 20492, 20501, 20511, 20512, 20522, 20531, 20532, 20542, 20545, 20551, 20553, 20561, 20562, 20563, 20571, 20581, 20582, 20591, 20592, 20593, 20601, 20605, 20612, 20613, 20621, 20622, 20631, 20632, 20633, 20641, 20642, 20651, 20661, 20662, 20672, 20673, 20681, 20691, 20692, 20693, 20701, 20702, 20703, 20712, 20732, 20742, 20751, 20752, 20762, 20771, 20772, 20781, 20782, 20783, 20791, 20792, 20851, 20862, 20881, 20921, 20922, 20931, 20961, 20971, 30011, 30012, 30021, 30022, 30042, 30051, 30052, 30061, 30062, 30071, 30072, 30073, 30081, 30092, 30095, 30102, 30103, 30111, 30112, 30121, 30122, 30131, 30132, 30133, 30141, 30142, 30151, 30152, 30161, 30162, 30163, 30171, 30172, 30173, 30181, 30185, 30202, 30203, 30211, 30221, 30222, 30231, 30232, 30241, 30242, 30243, 30251, 30252, 30262, 30271, 30281, 30282, 30291, 30301, 30302, 30311, 30321, 30331, 30332, 30341, 30342, 30343, 30351, 30352, 30353, 30361, 30362, 30371, 30372, 30373, 30375, 30382, 30391, 30392, 30393, 30401, 30402, 30403, 30411, 30421, 30422, 30431, 30432, 30441, 30442, 30443, 30445, 30451, 30452, 30455, 30461, 30462, 30463, 30471, 30472, 30481, 30482, 30483, 30491, 30492, 30501, 30512, 30521, 30522, 30531, 30532, 30541, 30542, 30543, 30552, 30553, 30561, 30562, 30563, 30571, 30572, 30581, 30582, 30591, 30592, 30601, 30602, 30605, 30611, 30612, 30622, 30623, 30631, 30641, 30643, 30661, 30672, 30681, 30683, 30691, 30692, 30693, 30701, 30702, 30703, 30711, 30712, 30722, 30731, 30741, 30742, 30743, 30751, 30752, 30762, 30771, 30772, 30781, 30782, 30791, 30801, 30832, 30912, 30922, 30991, 40011, 40012, 40013, 40021, 40022, 40031, 40033, 40041, 40051, 40052, 40053, 40061, 40062, 40071, 40072, 40073, 40081, 40082, 40083, 40091, 40092, 40111, 40112, 40131, 40132, 40141, 40142, 40151, 40152, 40161, 40171, 40172, 40181, 40182, 40191, 40192, 40193, 40201, 40202, 40211, 40212, 40213, 40221, 40222, 40231, 40233, 40241, 40242, 40251, 40253, 40255, 40261, 40271, 40272, 40281, 40282, 40283, 40291, 40292, 40301, 40302, 40303, 40311, 40312, 40313, 40315, 40321, 40322, 40331, 40332, 40333, 40341, 40351, 40352, 40361, 40362, 40371, 40372, 40373, 40381, 40392, 40402, 40411, 40421, 40422, 40431, 40432, 40452, 40455, 40461, 40462, 40463, 40471, 40472, 40481, 40482, 40491, 40492, 40493, 40495, 40501, 40502, 40505, 40511, 40512, 40513, 40521, 40522, 40531, 40532, 40533, 40541, 40542, 40545, 40551, 40552, 40561, 40562, 40571, 40573, 40581, 40591, 40592, 40601, 40611, 40612, 40621, 40622, 40631, 40632, 40641, 40642, 40651, 40652, 40661, 40665, 40671, 40673, 40681, 40682, 40691, 40692, 40693, 40701, 40702, 40703, 40711, 40712, 40721, 40731, 40732, 40741, 40742, 40748, 40753, 40763, 40772, 40781, 40782, 40783, 40801, 40821, 40831, 40912, 40913, 40921, 40952, 40982, 50011, 50012, 50021, 50022, 50023, 50032, 50041, 50051, 50052, 50053, 50071, 50081, 50082, 50083, 50092, 50093, 50101, 50102, 50111, 50112, 50115, 50121, 50122, 50132, 50141, 50142, 50151, 50153, 50161, 50162, 50171, 50181, 50182, 50192, 50193, 50201, 50202, 50211, 50212, 50221, 50232, 50241, 50242, 50252, 50261, 50262, 50271, 50273, 50281, 50291, 50292, 50303, 50311, 50312, 50321, 50322, 50333, 50338, 50341, 50342, 50345, 50351, 50352, 50361, 50362, 50371, 50372, 50373, 50382, 50391, 50393, 50401, 50402, 50411, 50412, 50421, 50422, 50423, 50431, 50441, 50442, 50445, 50451, 50461, 50463, 50471, 50472, 50481, 50482, 50483, 50491, 50492, 50501, 50502, 50505, 50508, 50511, 50512, 50521, 50522, 50531, 50533, 50541, 50542, 50545, 50548, 50551, 50552, 50561, 50562, 50563, 50572, 50583, 50591, 50592, 50601, 50602, 50603, 50611, 50612, 50621, 50623, 50631, 50632, 50651, 50661, 50662, 50672, 50682, 50691, 50692, 50711, 50712, 50721, 50722, 50731, 50733, 50741, 50752, 50761, 50771, 50781, 50782, 50783, 50802, 50821, 50822, 50832, 50881, 50932, 50941, 60011, 60012, 60013, 60021, 60022, 60023, 60031, 60032, 60041, 60042, 60045, 60052, 60055, 60062, 60072, 60081, 60082, 60083, 60091, 60092, 60101, 60102, 60105, 60121, 60131, 60132, 60133, 60141, 60143, 60151, 60161, 60163, 60165, 60171, 60172, 60173, 60181, 60182, 60183, 60191, 60192, 60193, 60202, 60211, 60212, 60213, 60221, 60222, 60223, 60231, 60233, 60241, 60242, 60243, 60251, 60252, 60253, 60261, 60262, 60265, 60271, 60272, 60275, 60281, 60292, 60301, 60302, 60303, 60311, 60312, 60321, 60322, 60331, 60332, 60341, 60342, 60345, 60351, 60352, 60353, 60361, 60362, 60371, 60372, 60373, 60381, 60391, 60392, 60401, 60402, 60411, 60421, 60422, 60431, 60432, 60441, 60442, 60443, 60451, 60455, 60462, 60463, 60472, 60475, 60481, 60482, 60491, 60492, 60493, 60501, 60511, 60512, 60515, 60522, 60523, 60532, 60545, 60551, 60552, 60562, 60563, 60571, 60572, 60581, 60583, 60591, 60593, 60595, 60601, 60602, 60611, 60612, 60615, 60621, 60622, 60625, 60631, 60632, 60641, 60643, 60651, 60652, 60662, 60671, 60672, 60681, 60691, 60692, 60701, 60702, 60712, 60713, 60721, 60723, 60731, 60741, 60742, 60743, 60751, 60761, 60762, 60775, 60781, 60782, 60791, 60811, 60831, 60832, 60863, 60872, 60882, 60893, 70012, 70021, 70023, 70031, 70032, 70033, 70035, 70041, 70042, 70043, 70052, 70062, 70071, 70081, 70082, 70083, 70091, 70092, 70101, 70111, 70112, 70113, 70131, 70141, 70151, 70152, 70161, 70162, 70171, 70172, 70173, 70181, 70183, 70191, 70192, 70205, 70211, 70212, 70215, 70221, 70222, 70225, 70232, 70233, 70235, 70241, 70243, 70248, 70251, 70261, 70262, 70271, 70272, 70282, 70291, 70292, 70301, 70302, 70311, 70312, 70321, 70322, 70331, 70341, 70342, 70343, 70351, 70361, 70362, 70363, 70371, 70372, 70373, 70381, 70391, 70392, 70393, 70398, 70402, 70411, 70412, 70421, 70422, 70431, 70432, 70433, 70435, 70441, 70442, 70443, 70451, 70452, 70461, 70472, 70481, 70482, 70491, 70492, 70493, 70501, 70502, 70503, 70505, 70511, 70512, 70522, 70531, 70532, 70542, 70551, 70552, 70553, 70561, 70562, 70571, 70572, 70581, 70591, 70592, 70601, 70602, 70603, 70611, 70612, 70621, 70622, 70623, 70631, 70632, 70633, 70641, 70645, 70652, 70653, 70661, 70662, 70672, 70681, 70682, 70683, 70691, 70693, 70701, 70731, 70732, 70741, 70742, 70752, 70761, 70762, 70772, 70781, 70791, 70811, 70932, 80011, 80012, 80021, 80022, 80032, 80042, 80045, 80052, 80053, 80055, 80061, 80062, 80071, 80072, 80081, 80082, 80088, 80091, 80092, 80101, 80103, 80111, 80113, 80121, 80123, 80131, 80132, 80133, 80141, 80142, 80151, 80152, 80161, 80172, 80175, 80182, 80191, 80192, 80195, 80201, 80203, 80212, 80223, 80231, 80232, 80241, 80243, 80251, 80252, 80261, 80263, 80271, 80272, 80283, 80285, 80291, 80302, 80311, 80312, 80321, 80322, 80323, 80331, 80332, 80338, 80341, 80343, 80352, 80361, 80362, 80371, 80372, 80381, 80382, 80383, 80401, 80402, 80411, 80413, 80421, 80422, 80432, 80442, 80452, 80461, 80462, 80471, 80472, 80473, 80481, 80482, 80483, 80485, 80491, 80492, 80501, 80511, 80512, 80521, 80523, 80531, 80532, 80541, 80551, 80552, 80555, 80562, 80572, 80573, 80585, 80591, 80601, 80602, 80611, 80621, 80631, 80633, 80641, 80643, 80651, 80652, 80663, 80671, 80672, 80682, 80691, 80692, 80693, 80701, 80711, 80721, 80722, 80731, 80733, 80741, 80742, 80743, 80751, 80752, 80761, 80771, 80781, 80782, 80783, 80792, 80801, 80818, 80831, 80842, 80851, 80871, 80951, 80955, 80961, 90011, 90012, 90013, 90021, 90022, 90031, 90032, 90041, 90042, 90051, 90058, 90061, 90062, 90071, 90081, 90091, 90092, 90101, 90111, 90112, 90121, 90122, 90123, 90131, 90132, 90141, 90142, 90151, 90152, 90161, 90162, 90165, 90171, 90172, 90181, 90182, 90192, 90198, 90201, 90202, 90205, 90211, 90212, 90213, 90221, 90223, 90231, 90241, 90245, 90251, 90252, 90261, 90262, 90263, 90271, 90272, 90273, 90281, 90282, 90283, 90291, 90292, 90298, 90301, 90302, 90312, 90313, 90321, 90322, 90331, 90332, 90333, 90341, 90342, 90351, 90352, 90363, 90365, 90371, 90372, 90381, 90391, 90392, 90401, 90402, 90411, 90412, 90421, 90423, 90431, 90433, 90441, 90442, 90451, 90452, 90461, 90462, 90471, 90472, 90473, 90481, 90491, 90492, 90502, 90511, 90521, 90522, 90531, 90541, 90551, 90552, 90561, 90562, 90563, 90571, 90572, 90581, 90582, 90592, 90598, 90601, 90602, 90603, 90611, 90612, 90621, 90623, 90631, 90641, 90642, 90651, 90652, 90661, 90671, 90673, 90682, 90691, 90692, 90712, 90713, 90721, 90731, 90732, 90741, 90751, 90753, 90771, 90772, 90773, 90791, 90871, 90872, 90893, 90933, 90943, 90952]
//These are the token IDs that are in the Hall of Fame.
hallOfFame = [10765, 20605, 30605, 40748, 50548, 60775, 70645, 80818, 90598, 10615, 20378, 30455, 40665, 50508, 60625, 70398, 80955, 90943, 10933, 20545, 30743, 50545, 60615, 70505, 80585, 90933, 10981, 20971, 30991, 40982, 50941, 60893, 70932, 80961, 90952]
highestHOFScore = [10765, 20605, 30605, 40748, 50548, 60775, 70645, 80818, 90598]
secondHOFScore = [10615, 20378, 30455, 40665, 50508, 60625, 70398, 80955, 90943]
thirdHOFScore = [10933, 20545, 30743, 50545, 60615, 70505, 80585, 90933]
highestHOFRating = [10981, 20971, 30991, 40982, 50941, 60893, 70932, 80961, 90952]

var m_w = 0
var m_z = 0
var mask = 0xffffffff

//Takes the VRF number.
function seed(i) {
    m_w = (123456789 + i) & mask
    m_z = (987654321 - i) & mask
}

//013593196060 was the seed, and saved as 13593196060. Leading zeroes are ignored.
//VRF coordinator callback https://polygonscan.com/tx/0xcca06123a5d11b0907e8dc612ea0c2fd08e299e67e2e27a17cb3289c8bde679c#eventlog
//Contract data https://polygonscan.com/address/0x681a2519fc5ca01f25a642a2a84b9d229749d9b7#readContract
seed(13593196060)

//Deterministic PRNG function. The same output occurs with the same seed.
function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0
    result /= 4294967296;
    return result
}

//Dependencies. Needs Web3.js to convert to padded hex.
const fs = require("fs")
const Web3 = require('web3')
const web3 = new Web3()

var filePathMetadata = "../nfts/founders-series/metadata/"
var filePathHumanMetadata = "../nfts/founders-series/human-readable-metadata/"
var filePathHTML = "../nfts/founders-series/"
var fileName = ""
var fileNameNFT = ""
var catArray = ["Sakura", "Anurak", "Chukcha", "Parvati", "Gatinho", "Gaston", "Plezier", "Yulenka", "Cooter"]
var multiplierArray = [1, 2, 3, 5, 8]
var tokenPrefix = 0
var imgBaseUrl = "ipfs://QmQSKwVhvTcfpgz8g47XgfvrSHTWe6a29WARdDs2uUHcZE/"

var nftHTML = `<!DOCTYPE html>
<html lang="en" style="height: 100%; width: 100%">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
    <link href="./css/main.css" rel="stylesheet">
</head>

<body>
    <div class="preloader">
<div class="spinner"></div>
</div>
    <div id="wrapper">
        <div class="nft">
            <div id="cat-card">
                <img id="cat-frame" src="">
                <img id="north" src="">
                <img id="east" src="">
                <img id="south" src="">
                <img id="west" src="">
                <img id="suit" src="">
                <div id="cat-gif">
                    <img id="cat" src="">
                </div>
            </div>
        </div>
    </div>
</body>

<script src="./js/script.js"></script>

</html>`

var cat = {
    "attributes": [{
            "trait_type": "Rarity",
            "value": ""
        },
        {
            "trait_type": "Rating",
            "value": 0
        },
        {
            "trait_type": "Multiplier",
            "value": 0
        },
        {
            "trait_type": "Total Score",
            "value": 0
        },
        {
            "trait_type": "North",
            "value": 0
        },
        {
            "trait_type": "East",
            "value": 0
        },
        {
            "trait_type": "South",
            "value": 0
        },
        {
            "trait_type": "West",
            "value": 0
        },
        {
            "trait_type": "Personality Suit",
            "value": ""
        }
    ],
    "description": "",
    "external_url": "",
    "animation_url": "",
    "image": "",
    "name": ""
}

function getPersonality(cat) {
    switch (true) {
        case (cat == "Sakura" || cat == "Gaston"):
            return "Whale"
        case (cat == "Chukcha"):
            return "Quant"
        case (cat == "Parvati" || cat == "Gatinho" || cat == "Cooter"):
            return "Punter"
        case (cat == "Anurak"):
            return "Hodler"
        case (cat == "Plezier" || cat == "Yulenka"):
            return "Yenta"
    }
}

//We need to translate the suit of the cat to a number.
function translateSuit(cat) {
    switch (true) {
        case (cat == "Sakura" || cat == "Gaston"):
            return "0"
        case (cat == "Chukcha"):
            return "1"
        case (cat == "Parvati" || cat == "Gatinho" || cat == "Cooter"):
            return "2"
        case (cat == "Anurak"):
            return "3"
        case (cat == "Plezier" || cat == "Yulenka"):
            return "4"
    }
}

function getProp() {

    let n = Math.floor(random() * 10)

    switch (true) {
        case (n == 0):
            return "1"
        case (n == 1):
            return "1"
        case (n == 2):
            return "2"
        case (n == 3):
            return "3"
        case (n == 4):
            return "4" //Box
        case (n == 5):
            return "5"
        case (n == 6):
            return "6" //Leverage
        case (n == 7):
            return "7" //Stringalong
        case (n == 8):
            return "8"
        case (n == 9):
            return "9" //Nine Lives
    }
}

catArray.forEach(function(catInArray) {
    tokenPrefix++ //+1 to start because IDs can't start with 0.
    //One loop for every possible multiplier.
    multiplierArray.forEach(function(multiplierValue) {
        for (i = 1; i < 101; i++) {
            //Set multiplier for this loop.
            cat.attributes[2].value = multiplierValue
            //Increment the rating by each card.
            cat.attributes[1].value = i
            //Multiply the rating by the multiplier to get the total score.
            cat.attributes[3].value = cat.attributes[1].value * cat.attributes[2].value

            var tokenID = (((tokenPrefix * 10 ** 4) + (cat.attributes[1].value * 10)) + cat.attributes[2].value)
            var totalScore = cat.attributes[3].value
            var rating = cat.attributes[1].value
            var rarity = cat.attributes[0]

            //Set the class based on the total score and rating.
            //Score
            //Top 5% >=180
            //Top 10% >=142 && <180
            //Top 15% >=121 && <142
            //
            //Rating
            //Top 1% >=90
            //Top 2% >=80 && <90
            //Top 9% >=70 && <80
            //Nut Low == 1
            switch (true) {
                case (hallOfFame.includes(tokenID) == true):
                    rarity.value = "Hall of Fame"
                    break
                case (totalScore == 1):
                    rarity.value = "Nut Low"
                    break
                case (totalScore >= 2 && totalScore < 121):
                    switch (true) {
                        case (rating >= 70 && rating < 80):
                            rarity.value = "Top 9% Rating"
                            break
                        case (rating >= 80 && rating < 90):
                            rarity.value = "Top 2% Rating"
                            break
                        case (rating >= 90 && rating <= 100):
                            rarity.value = "Top 1% Rating"
                            break
                        case (totalScore >= 2 && totalScore < 121):
                            rarity.value = "Common"
                            break
                    }
                    break
                case (totalScore >= 121 && totalScore < 142):
                    switch (true) {
                        case (rating >= 70 && rating < 80):
                            rarity.value = "Top 9% Rating"
                            break
                        case (rating >= 80 && rating < 90):
                            rarity.value = "Top 2% Rating"
                            break
                        case (rating >= 90 && rating <= 100):
                            rarity.value = "Top 1% Rating"
                            break
                        case (totalScore >= 121 && totalScore < 142):
                            rarity.value = "Top 15% Score"
                            break
                    }
                    break
                case (totalScore >= 142 && totalScore < 180):
                    switch (true) {
                        case (rating >= 70 && rating < 80):
                            rarity.value = "Top 9% Rating"
                            break
                        case (rating >= 80 && rating < 90):
                            rarity.value = "Top 2% Rating"
                            break
                        case (rating >= 90 && rating <= 100):
                            rarity.value = "Top 1% Rating"
                            break
                        case (totalScore >= 142 && totalScore < 180):
                            rarity.value = "Top 10% Score"
                            break
                    }
                    break
                case (totalScore >= 180):
                    switch (true) {
                        //Top 9% ratings are now less rare than 5%.
                        case (rating >= 80 && rating < 90):
                            rarity.value = "Top 2% Rating"
                            break
                        case (rating >= 90 && rating <= 100):
                            rarity.value = "Top 1% Rating"
                            break
                        case (totalScore >= 180):
                            rarity.value = "Top 5% Score"
                            break
                    }
                    break
            }

            cat.attributes[4].value = getProp()
            cat.attributes[5].value = getProp()
            cat.attributes[6].value = getProp()
            cat.attributes[7].value = getProp()
            cat.attributes[8].value = translateSuit(catInArray)

            var properties = cat.attributes[4].value + cat.attributes[5].value + cat.attributes[6].value + cat.attributes[7].value + cat.attributes[8].value

            cat.attributes[4].value = addStringsToPropSymbols(cat.attributes[4].value)
            cat.attributes[5].value = addStringsToPropSymbols(cat.attributes[5].value)
            cat.attributes[6].value = addStringsToPropSymbols(cat.attributes[6].value)
            cat.attributes[7].value = addStringsToPropSymbols(cat.attributes[7].value)

            function addStringsToPropSymbols(propNumber) {
                switch (true) {
                    case (propNumber == 1):
                        return "1"
                    case (propNumber == 2):
                        return "2"
                    case (propNumber == 3):
                        return "3"
                    case (propNumber == 4):
                        return "Box"
                    case (propNumber == 5):
                        return "5"
                    case (propNumber == 6):
                        return "Leverage"
                    case (propNumber == 7):
                        return "Stringalong"
                    case (propNumber == 8):
                        return "8"
                    case (propNumber == 9):
                        return "Nine Lives"
                }
            }

            cat.attributes[8].value = getPersonality(catInArray)

            function findFrame() {
                //0 is gold, 1 is silver, 3 is bronze, and 4 is bronze.
                switch (true) {
                    case (highestHOFScore.includes(tokenID) == true || highestHOFRating.includes(tokenID) == true):
                        return 0
                    case (secondHOFScore.includes(tokenID) == true):
                        return 1
                    case (thirdHOFScore.includes(tokenID) == true):
                        return 2
                    default:
                        return 3
                }
            }

            //Set the description based on the cat.
            cat.description = "This Chainlink VRF " + rarity.value.toLowerCase() + " " + catInArray + " purrs with a rating of " + cat.attributes[1].value + ", and a multiplier of " + cat.attributes[2].value + "x. It has a total score of " + cat.attributes[3].value + ", and confers the same amount of votes in the EtherCats DAO. The card game properties are " + cat.attributes[4].value + " for North, " + cat.attributes[5].value + " for East, " + cat.attributes[6].value + " for South, and " + cat.attributes[7].value + " for West. " + catInArray + " has the personality suit of " + cat.attributes[8].value.toLowerCase() + ". Each Founders Series cat is part of NFT history. These fine felines represent the first verifiably random packs minted with Chainlink VRF."
            //Set the external_url.
            cat.external_url = "https://www.ethercats.io/nfts/" + catInArray.toLowerCase() + "/"
            //Set the animation_url. The file names of the nfts must be output first to get an immutable IPFS hash.
            cat.animation_url = "https://www.ethercats.io/founders-series/" + tokenID + "-" + properties + "-" + findFrame() + ".html"
            //Set the image url.
            cat.image = imgBaseUrl + tokenID + ".png"
            //Set the NFT name.
            if (totalScore == 1) {
                cat.name = catInArray + " [" + totalScore + " Vote, " + rarity.value + "]"
            } else {
                cat.name = catInArray + " [" + totalScore + " Votes, " + rarity.value + "]"
            }

            //Add more detail to the Rarity field if the cat is in the Hall of Fame.
            if (hallOfFame.includes(tokenID) == true) {
                switch (true) {
                    case (highestHOFScore.includes(tokenID) == true):
                        rarity.value = "Hall of Fame - Highest Score"
                        break
                    case (secondHOFScore.includes(tokenID) == true):
                        rarity.value = "Hall of Fame - 2nd Highest Score"
                        break
                    case (thirdHOFScore.includes(tokenID) == true):
                        rarity.value = "Hall of Fame - 3rd Highest Score"
                        break
                    case (highestHOFRating.includes(tokenID) == true):
                        rarity.value = "Hall of Fame - Highest Rating"
                        break
                }
            }

            //Set the metadata file name as the token ID.
            fileName = web3.utils.padLeft(web3.utils.toHex(tokenID), 64).slice(2) + ".json"
            //Set the NFT file name as the token ID, plus the card game properties, and the frame ID.
            fileNameNFT = tokenID + "-" + properties + "-" + findFrame() + ".html"

            if (existingTokens.includes(tokenID) === true) {
                fs.writeFile(filePathMetadata + fileName, JSON.stringify(cat, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                    console.log("A metadata file has been created.");
                })
            }

            if (existingTokens.includes(tokenID) === true) {
                fs.writeFile(filePathHumanMetadata + tokenID + ".json", JSON.stringify(cat, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                    console.log("A human readable metadata file has been created.");
                })
            }

            if (existingTokens.includes(tokenID) === true) {
                fs.writeFile(filePathHTML + fileNameNFT, nftHTML, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                    console.log("A token html file has been created.");
                })
            }
        }
    })
})