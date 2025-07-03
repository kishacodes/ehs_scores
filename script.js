// Mock data - in a real app you would fetch from a sports API
        const mockGames = [
    {
        id: 1,
        team: 'varsity',
        ehs: 'Emerson',
        opponent: 'McKinney',
        ehsScore: 2,
        opponentScore: 1,
        status: 'live',
        time: '72\'',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg'
    },
    {
        id: 2,
        team: 'jv',
        ehs: 'Emerson',
        opponent: 'McKinney',
        ehsScore: 98,
        opponentScore: 102,
        status: 'live',
        time: 'Q4 07:32',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg'
    },
    {
        id: 3,
        team: 'freshmen',
        ehs: 'Emerson (A team)',
        opponent: 'McKinney',
        ehsScore: 98,
        opponentScore: 102,
        status: 'live',
        time: 'Q4 07:32',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg'
    },
    {
        id: 4,
        team: 'freshmen',
        ehs: 'Emerson (B team)',
        opponent: 'McKinney',
        ehsScore: 98,
        opponentScore: 102,
        status: 'live',
        time: 'Q4 07:32',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg'
    },
    {
        id: 5,
        team: 'varsity',
        ehs: 'Emerson',
        opponent: 'McKinney',
        ehsScore: 98,
        opponentScore: 102,
        status: 'live',
        time: 'Q4 07:32',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg'
    },
    {
        id: 6,
        team: 'jv',
        ehs: 'Emerson',
        opponent: 'Reedy',
        ehsScore: 98,
        opponentScore: 102,
        status: 'live',
        time: 'Q4 07:32',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg'
    }
];

        let currentFilter = 'all';
        
        // Initialize the dashboard
        document.addEventListener('DOMContentLoaded', function() {
            fetchGames();
            // Set up auto-refresh every 30 seconds
            setInterval(fetchGames, 30000);
        });
        
        function fetchGames() {
            // In a real app, this would be an API call
            // axios.get('https://api.sportsdata.io/v3/scores?key=YOUR_API_KEY')
            //     .then(response => {
            //         renderGames(response.data);
            //         updateLastUpdated();
            //     })
            //     .catch(error => {
            //         console.error('Error fetching games:', error);
            //     });
            
            // For demo purposes, we'll use mock data
            renderGames(mockGames);
            updateLastUpdated();
        }
        
        function renderGames(games) {
            const container = document.getElementById('gamesContainer');
            
            // Filter games based on current sport selection
            const filteredGames = currentFilter === 'all' 
                ? games 
                : games.filter(game => game.sport === currentFilter);
            
            if (filteredGames.length === 0) {
                container.innerHTML = '<div class="no-games">No games available for this sport</div>';
                return;
            }
            
            container.innerHTML = filteredGames.map(game => `
                <div class="game-card">
                    <div class="game-header">
                        <span class="game-league">${game.league}</span>
                        <span class="game-status">
                            ${game.status === 'live' ? 
                                `<span class="live-status"><span class="live-pulse"></span>LIVE ${game.time}</span>` : 
                              game.status === 'final' ? 'FINAL' : 
                              game.time}
                        </span>
                    </div>
                    <div class="teams">
                        <div class="team">
                            <img src="${game.homeLogo}" alt="${game.homeTeam}" class="team-logo">
                            <span class="team-name">${game.homeTeam}</span>
                            <span class="team-score">${game.homeScore}</span>
                        </div>
                        <div class="team">
                            <img src="${game.awayLogo}" alt="${game.awayTeam}" class="team-logo">
                            <span class="team-name">${game.awayTeam}</span>
                            <span class="team-score">${game.awayScore}</span>
                        </div>
                    </div>
                    <div class="game-details">
                        ${getGameDetails(game)}
                    </div>
                </div>
            `).join('');
        }
        
        function getGameDetails(game) {
            switch(game.team) {
                case 'varsity':
                    return `Matchday 24 • ${game.status === 'live' ? game.time + ' played' : game.status === 'upcoming' ? 'Kickoff at ' + game.time : 'Full Time'}`;
                case 'jv':
                    return `Regular Season • ${game.status === 'live' ? game.time + ' remaining' : game.status === 'upcoming' ? 'Tip-off at ' + game.time : 'Game Ended'}`;
                case 'freshmen':
                    return `Quarterfinals • ${game.status === 'live' ? 'Current set: ' + game.time : game.status === 'upcoming' ? 'Match starts at ' + game.time : 'Match Completed'}`;
                default:
                    return '';
            }
        }
        
        function filterGames(team) {
            currentFilter = team;
            
            // Update active tab
            document.querySelectorAll('.team-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Re-render games with new filter
            renderGames(mockGames);
        }
        
        function updateLastUpdated() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('lastUpdated').textContent = `Last updated: ${timeString}`;
        }
  