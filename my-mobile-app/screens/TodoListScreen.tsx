import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Alert } from 'react-native';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoListApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInput('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Pressable
        style={styles.checkBox}
        onPress={() => toggleTodo(item.id)}
      >
        <Text style={styles.checkBoxText}>
          {item.completed ? '✓' : '○'}
        </Text>
      </Pressable>
      <Text
        style={[
          styles.todoText,
          item.completed && styles.completedText,
        ]}
      >
        {item.text}
      </Text>
      <Pressable
        style={styles.deleteBtn}
        onPress={() => deleteTodo(item.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
        />
        <Pressable style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos yet. Add one!</Text>
        }
      />

      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Total: {todos.length} | Done: {todos.filter((t) => t.completed).length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#16213e',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#00d4ff',
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#00d4ff',
    width: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#00d4ff',
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#00d4ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkBoxText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  completedText: {
    color: '#666',
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#ff6b6b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 40,
  },
  stats: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#16213e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#00d4ff',
  },
  statsText: {
    color: '#00d4ff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
