const fs = require('fs');

// Graph structure to store transitions
const graph = {};

// Transitions based on provided details (staff: [(next_staff, tempo, previous_node)])
const transitions = {
    17: [[18, 88, null], [20, 100, null], [27, 100, null], [29, 100, null], [30, 100, null]],
    18: [[19, null, null], [20, null, null]],
    19: [[21, null, null], [23, null, null], [36, null, null]],
    20: [[21, null, 17], [21, null, 24], [19, null, 18], [29, null, 18]],
    21: [[18, 52, 19], [26, 52, 19], [22, 52, 19], [18, 52, 32], [26, 52, 32], [22, 52, 32], [23, 70, 19], [23, 70, 32], [18, 82, 20], [26, 82, 20], [22, 82, 20]],
    22: [[17, null, null], [23, null, null]],
    23: [[26, null, null], [31, null, null]],
    24: [[19, null, null], [20, null, null], [25, null, null], [27, null, null], [29, null, null], [30, null, null]],
    25: [[19, null, null], [24, null, null], [28, null, null], [29, null, null], [30, null, null], [31, null, null], [32, null, null], [34, null, null]],
    26: [[19, null, null], [24, null, null], [27, null, null], [28, null, null], [29, null, null], [35, null, null], [37, null, null]],
    27: [[25, null, null], [28, null, null], [30, null, null], [35, null, null], [37, null, null]],
    28: [[24, null, null], [29, null, null], [19, null, null], [31, null, null], [32, null, null]],
    29: [[24, null, null], [25, null, null], [27, null, null], [30, null, null]],
    30: [[19, null, null], [24, null, null], [25, null, null], [28, null, null], [29, null, null], [31, null, null], [32, null, null], [34, null, null]],
    31: [[18, null, null], [26, null, null], [34, null, null]],
    32: [[21, null, null], [34, null, null], [36, null, null], [38, null, null]],
    33: [[32, null, null], [35, null, null]],
    34: [[27, null, null], [28, null, null], [33, null, null], [35, null, null], [37, null, null]],
    35: [[32, null, null], [33, null, null], [36, null, null]],
    36: [[27, null, null], [28, null, null], [35, null, null], [37, null, null], [38, null, null]],
    38: [[36, null, null], [37, null, null]]
};

// Populate the graph from the transitions
for (const [key, values] of Object.entries(transitions)) {
    graph[key] = {};
    for (const [value, tempo, prev] of values) {
        const keyTuple = JSON.stringify([tempo, prev]);
        if (!graph[key][keyTuple]) {
            graph[key][keyTuple] = [];
        }
        graph[key][keyTuple].push(value);
    }
}

// Function to find all paths from start to exit ensuring all staffs are played exactly once
function findAllPaths(graph, start, visited = new Set(), path = [], currentTempo = null, prevNode = null) {
    // Determine the appropriate node representation based on whether the tempo is relevant for this transition
    const nodeRepresentation = currentTempo !== null ? `${start}(${currentTempo})` : `${start}`;
    path = [...path, nodeRepresentation];
    visited.add(start);

    let paths = [];
    if (graph[start]) {  // Ensure graph[start] exists
        for (const [keyTuple, nodes] of Object.entries(graph[start])) {
            const [tempo, prev] = JSON.parse(keyTuple);
            if (prev === null || prev === prevNode) {  // Check previous node condition
                for (const node of nodes) {
                    if (!visited.has(node)) {
                        // Only pass the tempo forward if it's relevant for the next transition
                        const newTempo = tempo === null ? null : tempo;
                        const newPaths = findAllPaths(graph, node, new Set(visited), path, newTempo, start);
                        paths = paths.concat(newPaths);
                    }
                }
            }
        }
    }

    // Check if this is a valid path ending at 37 after visiting all nodes
    if (start === 37 && visited.size === Object.keys(transitions).length) {
        return [path];
    }
    
    return paths;
}

// Find all paths from the start node
const startNode = 17;  // Start at node 17

// Get all paths
const allPaths = findAllPaths(graph, startNode);

// Write all paths to a file
fs.writeFileSync('paths.txt', allPaths.map((path, index) => `${index + 1}. ${JSON.stringify(path)}\n`).join(''), 'utf8');

console.log(`Found ${allPaths.length} paths. Check 'paths.txt' for details.`);

