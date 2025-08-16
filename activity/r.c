#include <stdio.h>
#include <stdlib.h>

// Structure to represent an edge in the graph
struct Edge {
    int src, dest, weight;
};

// Structure to represent a graph
struct Graph {
    int V, E;
    struct Edge* edges;
};

// Function to create a graph with given vertices and edges
struct Graph* createGraph(int V, int E) {
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
    graph->V = V;
    graph->E = E;
    graph->edges = (struct Edge*)malloc(E * sizeof(struct Edge));
    return graph;
}

// Structure for Union-Find to represent subsets
struct Subset {
    int parent, rank;
};

// Function to find the representative of a set with path compression
int find(struct Subset subsets[], int i) {
    if (subsets[i].parent != i)
        subsets[i].parent = find(subsets, subsets[i].parent);
    return subsets[i].parent;
}

// Function to perform union by rank
void Union(struct Subset subsets[], int x, int y) {
    int rootX = find(subsets, x);
    int rootY = find(subsets, y);

    if (subsets[rootX].rank < subsets[rootY].rank)
        subsets[rootX].parent = rootY;
    else if (subsets[rootX].rank > subsets[rootY].rank)
        subsets[rootY].parent = rootX;
    else {
        subsets[rootY].parent = rootX;
        subsets[rootX].rank++;
    }
}

// Function to compare edges by weight for sorting
int compareEdges(const void* a, const void* b) {
    return ((struct Edge*)a)->weight - ((struct Edge*)b)->weight;
}

// Function to implement Kruskal's Algorithm
void kruskalMST(struct Graph* graph) {
    int V = graph->V;
    struct Edge result[V];  // Array to store MST edges
    int e = 0;  // Index for result array
    int i = 0;  // Index for sorted edges

    // Sort edges in ascending order of weight
    qsort(graph->edges, graph->E, sizeof(graph->edges[0]), compareEdges);

    // Allocate memory for subsets
    struct Subset* subsets = (struct Subset*)malloc(V * sizeof(struct Subset));
    for (int v = 0; v < V; v++) {
        subsets[v].parent = v;
        subsets[v].rank = 0;
    }

    // Iterate through sorted edges
    while (e < V - 1 && i < graph->E) {
        struct Edge nextEdge = graph->edges[i++];
        int x = find(subsets, nextEdge.src);
        int y = find(subsets, nextEdge.dest);

        // Include edge in MST if it does not create a cycle
        if (x != y) {
            result[e++] = nextEdge;
            Union(subsets, x, y);
        }
    }

    // Print the Minimum Spanning Tree
    printf("Minimum Spanning Tree using Kruskal's Algorithm:\n");
    for (i = 0; i < e; i++)
        printf("Edge: %d - %d | Weight: %d\n", result[i].src, result[i].dest, result[i].weight);

    free(subsets);
}

int main() {
    int V = 4, E = 5;
    struct Graph* graph = createGraph(V, E);
    
    // Adding edges to the graph
    graph->edges[0] = (struct Edge){0, 1, 10};
    graph->edges[1] = (struct Edge){0, 2, 6};
    graph->edges[2] = (struct Edge){0, 3, 5};
    graph->edges[3] = (struct Edge){1, 3, 15};
    graph->edges[4] = (struct Edge){2, 3, 4};
    
    // Calling Kruskal's Algorithm
    kruskalMST(graph);
    
    // Free allocated memory
    free(graph->edges);
    free(graph);
    return 0;
}







class Item:
    def __init__(self, value, weight):
        self.value = value
        self.weight = weight

def fractional_knapsack(capacity, items):
    items.sort(key=lambda x: x.value / x.weight, reverse=True)
    total_value = 0.0
    
    for item in items:
        if capacity >= item.weight:
            capacity -= item.weight
            total_value += item.value
        else:
            total_value += item.value * (capacity / item.weight)
            break
    
    return total_value

# Example Usage
items = [Item(60, 10), Item(100, 20), Item(120, 30)]
capacity = 50
max_value = fractional_knapsack(capacity, items)
print("Maximum value in Knapsack =", max_value)



class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.edges = []
    
    def add_edge(self, u, v, w):
        self.edges.append((w, u, v))
    
    def find(self, parent, i):
        if parent[i] == i:
            return i
        return self.find(parent, parent[i])
    
    def union(self, parent, rank, x, y):
        root_x = self.find(parent, x)
        root_y = self.find(parent, y)
        
        if rank[root_x] < rank[root_y]:
            parent[root_x] = root_y
        elif rank[root_x] > rank[root_y]:
            parent[root_y] = root_x
        else:
            parent[root_y] = root_x
            rank[root_x] += 1
    
    def kruskal_mst(self):
        self.edges.sort()
        parent = [i for i in range(self.V)]
        rank = [0] * self.V
        mst = []
        
        for edge in self.edges:
            w, u, v = edge
            x = self.find(parent, u)
            y = self.find(parent, v)
            
            if x != y:
                mst.append((u, v, w))
                self.union(parent, rank, x, y)
        
        return mst

# Example Usage
g = Graph(4)
g.add_edge(0, 1, 10)
g.add_edge(0, 2, 6)
g.add_edge(0, 3, 5)
g.add_edge(1, 3, 15)
g.add_edge(2, 3, 4)

mst = g.kruskal_mst()
print("Edges in MST:", mst)