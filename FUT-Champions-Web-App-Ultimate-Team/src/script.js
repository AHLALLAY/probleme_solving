let players = [];
    let currentPosition = '';

    async function fetchPlayerData() {
        const response = await fetch('https://younessboumeshouli.github.io/FUT_CHAMPIONS_API/player2.json');
        const data = await response.json();
        players = data.players;
        popPlayerSelect();
    }

    function popPlayerSelect() {
        const playerSelect = document.getElementById('playerSelect');
        players.forEach(player => {
            const option = document.createElement('option');
            option.value = player.position.toLowerCase();
            option.text = player.name;
            playerSelect.add(option);
        });
    }

    function openModal(position) {
        currentPosition = position;
        const modal = document.getElementById('playerModal');
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('playerModal');
        modal.style.display = 'none';
    }

    function openNewPlayerModal() {
        const modal = document.getElementById('newPlayerModal');
        modal.style.display = 'block';
    }

    function closeNewPlayerModal() {
        const modal = document.getElementById('newPlayerModal');
        modal.style.display = 'none';
    }

    function validateInput(input, regex) {
        return regex.test(input);
    }

    function addNewPlayer() {
        const name = document.getElementById('name').value;
        const image = document.getElementById('image').value;
        const position = document.getElementById('position').value;
        const nationality = document.getElementById('nationality').value;
        const club = document.getElementById('club').value;
        const rating = document.getElementById('rating').value;
        const pace = document.getElementById('pace').value;
        const shooting = document.getElementById('shooting').value;
        const passing = document.getElementById('passing').value;
        const dribbling = document.getElementById('dribbling').value;
        const defending = document.getElementById('defending').value;
        const physical = document.getElementById('physical').value;

        const nameRegex = /^[a-zA-Z\s]+$/;
        const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/;
        const nationalityRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/;
        const clubRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/;
        const ratingRegex = /^(1[0-0]|[1-9]?[0-9])$/; // 0-100
        const attributeRegex = /^(0|[1-9][0-9]?|100)$/; // 0-100

        if (!validateInput(name, nameRegex)) {
            alert('Invalid name. Please use only letters and spaces.');
            return;
        }
        if (!validateInput(image, urlRegex)) {
            alert('Invalid image URL. Please provide a valid URL.');
            return;
        }
        if (!validateInput(nationality, nationalityRegex)) {
            alert('Invalid nationality. Please provide a valid URL.');
            return;
        }
        if (!validateInput(club, clubRegex)) {
            alert('Invalid club logo. Please provide a valid URL.');
            return;
        }
        if (!validateInput(rating, ratingRegex)) {
            alert('Invalid rating. Please enter a number between 0 and 100.');
            return;
        }
        if (!validateInput(pace, attributeRegex) || !validateInput(shooting, attributeRegex) || 
            !validateInput(passing, attributeRegex) || !validateInput(dribbling, attributeRegex) || 
            !validateInput(defending, attributeRegex) || !validateInput(physical, attributeRegex)) {
            alert('Invalid attributes. Please enter numbers between 0 and 100.');
            return;
        }

        const newPlayer = {
            name,
            image,
            position,
            nationality,
            club,
            rating,
            pace,
            shooting,
            passing,
            dribbling,
            defending,
            physical,
        };

        players.push(newPlayer);

        const card = document.getElementById(newPlayer.position);
        if (card) {
            card.innerHTML = `
                <div class="player-info">
                    <img src="${newPlayer.image}" alt="${newPlayer.name}" class="player-image">
                    <p class="name">${newPlayer.name}</p>
                    <div class="stats">
                        <p class="rating">${newPlayer.rating}</p>
                        <div class="attributes">
                            <p>PAC ${newPlayer.pace}</p>
                            <p>SHO ${newPlayer.shooting}</p>
                            <p>PAS ${newPlayer.passing}</p>
                            <p>DRI ${newPlayer.dribbling}</p>
                            <p>DEF ${newPlayer.defending}</p>
                            <p>PHY ${newPlayer.physical}</p>
                        </div>
                    </div>
                </div>
                <img src="${newPlayer.club}" alt="${newPlayer.club}" class="club">
                <img src="${newPlayer.nationality}" alt="${newPlayer.nationality}" class="nationality">
            `;
        }

        closeNewPlayerModal();
    }

    function addPlayer() {
        const playerSelect = document.getElementById('playerSelect');
        const selectedPlayerName = playerSelect.options[playerSelect.selectedIndex].text;
        const player = players.find(p => p.name === selectedPlayerName);

        if (player) {
            const card = document.getElementById(currentPosition);

            if (card && player.position == "GK") {
                card.innerHTML = `
                    <div class="player-info">
                        <img src="${player.photo}" alt="${player.name}" class="player-image">
                        <p class="name">${player.name}</p>
                        <div class="stats">
                            <p class ="rating">${player.rating}</p>
                            <div class="attributes">
                                <p>HAN ${player.handling}</p>
                                <p>DIV ${player.diving}</p>
                                <p>POS ${player.positioning}</p>
                                <p>KIC ${player.kicking}</p>
                                <p>REF ${player.reflexes }</p>
                                <p>SPE ${player.speed}</p>
                            </div>
                        </div>
                    </div>
                    <img src="${player.logo}" alt="${player.club}" class="club">
                    <img src="${player.flag}" alt="${player.nation}" class="nationality">
                `;
            }
            if (card && player.position != "GK") {
                card.innerHTML = `
                    <div class="player-info">
                        <img src="${player.photo}" alt="${player.name}" class="player-image">
                        <p class="name">${player.name}</p>
                        <div class="stats">
                            <p class ="rating">${player.rating}</p>
                            <div class="attributes">
                                <p>PAC ${player.pace}</p>
                                <p>SHO ${player.shooting}</p>
                                <p>PAS ${player.passing}</p>
                                <p>DRI ${player.dribbling}</p>
                                <p>DEF ${player.defending }</p>
                                <p>PHY ${player.physical}</p>
                            </div>
                        </div>
                    </div>
                    <img src="${player.logo}" alt="${player.club}" class="club">
                    <img src="${player.flag}" alt="${player.nation}" class="nationality">
                `;
            }
        }

        closeModal();
    }

    function deletePlayer() {
        const playerSelect = document.getElementById('playerSelect');
        const selectedPlayerName = playerSelect.options[playerSelect.selectedIndex].text;
        const card = document.getElementById(currentPosition);

        if (card) {
            card.innerHTML = `
                <div class="player-info">
                    <p>${currentPosition.toUpperCase()}</p>
                </div>
            `;
        }

        closeModal();
    }

    fetchPlayerData();

































































































    // function editPlayer() {
    //     const playerSelect = document.getElementById('playerSelect');
    //     const selectedPlayerName = playerSelect.options[playerSelect.selectedIndex].text;
    //     const player = players.find(p => p.name === selectedPlayerName);
    
    //     if (player) {

    //         document.getElementById('name').value = player.name;
    //         document.getElementById('image').value = player.image;
    //         document.getElementById('position').value = player.position;
    //         document.getElementById('nationality').value = player.nationality;
    //         document.getElementById('club').value = player.club;
    //         document.getElementById('rating').value = player.rating;
    //         document.getElementById('pace').value = player.pace;
    //         document.getElementById('shooting').value = player.shooting;
    //         document.getElementById('passing').value = player.passing;
    //         document.getElementById('dribbling').value = player.dribbling;
    //         document.getElementById('defending').value = player.defending;
    //         document.getElementById('physical').value = player.physical;
    
            
    //         openNewPlayerModal();
    //     }
    // }
    
    // function addNewPlayer() {
        
    //     const name = document.getElementById('name').value;
    //     const image = document.getElementById('image').value;
    //     const position = document.getElementById('position').value;
    //     const nationality = document.getElementById('nationality').value;
    //     const club = document.getElementById('club').value;
    //     const rating = document.getElementById('rating').value;
    //     const pace = document.getElementById('pace').value;
    //     const shooting = document.getElementById('shooting').value;
    //     const passing = document.getElementById('passing').value;
    //     const dribbling = document.getElementById('dribbling').value;
    //     const defending = document.getElementById('defending').value;
    //     const physical = document.getElementById('physical').value;
    
    
    //     const playerIndex = players.findIndex(player => player.name === document.getElementById('playerSelect').value);
        
    //     if (playerIndex !== -1) {
            
    //         players[playerIndex] = {
    //             name,
    //             image,
    //             position,
    //             nationality,
    //             club,
    //             rating,
    //             pace,
    //             shooting,
    //             passing,
    //             dribbling,
    //             defending,
    //             physical,
    //         };
    
        
    //         const card = document.getElementById(position);
    //         if (card) {
    //             card.innerHTML = `
    //                 <div class="player-info">
    //                     <img src="${image}" alt="${name}" class="player-image">
    //                     <p class="name">${name}</p>
    //                     <div class="stats">
    //                         <p class="rating">${rating}</p>
    //                         <div class="attributes">
    //                             <p>PAC ${pace}</p>
    //                             <p>SHO ${shooting}</p>
    //                             <p>PAS ${passing}</p>
    //                             <p>DRI ${dribbling}</p>
    //                             <p>DEF ${defending}</p>
    //                             <p>PHY ${physical}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <img src="${club}" alt="${club}" class="club">
    //                 <img src="${nationality}" alt="${nationality}" class="nationality">
    //             `;
    //         }
    //     }
    
    //     closeNewPlayerModal();
    // }