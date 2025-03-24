import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, Card, Button, Badge, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const employees = [
  { id: '1', name: 'Phạm Thoại', role: 'Kế toán', email: 'thoaipham@cpn.com', phone: '(555) 123-4567', roleLabel: 'Accountant', roleColor: 'blue', status: 'online' },
  { id: '2', name: 'Nguyễn Thị Mơ', role: 'Nhân viên', email: 'sarah.w@company.com', phone: '(555) 234-5678', roleLabel: 'Staff', roleColor: 'pink', status: 'offline' },
  { id: '3', name: 'Lê Văn Luyện', role: 'Quản lí', email: 'michael.c@company.com', phone: '(555) 345-6789', roleLabel: 'Management', roleColor: 'green', status: 'busy' },
  { id: '4', name: 'Lê Thị Tuyết Hoa', role: 'Kế toán', email: 'lethith@company.com', phone: '(555) 456-7890', roleLabel: 'Accountant', roleColor: 'blue', status: 'offline' },
  { id: '5', name: 'Nguyễn Văn A', role: 'Kế toán', email: 'nguyenvana@company.com', phone: '(555) 567-8901', roleLabel: 'Accountant', roleColor: 'blue', status: 'online' },
  { id: '6', name: 'Trần B', role: 'Nhân viên', email: 'tranb@company.com', phone: '(555) 678-9012', roleLabel: 'Staff', roleColor: 'pink', status: 'busy' },
  { id: '7', name: 'Lý Văn C', role: 'Nhân viên', email: 'lyvanc@company.com', phone: '(555) 789-0123', roleLabel: 'Staff', roleColor: 'pink', status: 'online' },
  { id: '8', name: 'Đinh Thị D', role: 'Kế toán', email: 'dinhthid@company.com', phone: '(555) 890-1234', roleLabel: 'Accountant', roleColor: 'blue', status: 'offline' },
  { id: '9', name: 'Phạm E', role: 'Quản lí', email: 'phame@company.com', phone: '(555) 901-2345', roleLabel: 'Management', roleColor: 'green', status: 'online' },
  { id: '10', name: 'Nguyễn F', role: 'Nhân viên', email: 'nguyenf@company.com', phone: '(555) 012-3456', roleLabel: 'Staff', roleColor: 'pink', status: 'busy' }
];

const EmployeeListApp = () => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [searchText, setSearchText] = useState('');

  const filterEmployees = (role: string) => {
    setFilteredEmployees(
      role === 'Tất cả' ? employees : employees.filter(emp => emp.role === role)
    );
  };

  const searchEmployees = (text: string) => {
    setSearchText(text);
    setFilteredEmployees(
      employees.filter(emp => emp.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#888" style={{ marginLeft: 10 }} />
        <TextInput 
          style={styles.searchBar} 
          placeholder="Tìm nhân viên" 
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={searchEmployees}
        />
      </View>
      <View style={styles.filterTabs}>
        {['Tất cả', 'Kế toán', 'Nhân viên', 'Quản lí'].map((tab, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.tabButton} 
            onPress={() => filterEmployees(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.avatarContainer}>
                <Avatar.Text 
                  size={40} 
                  label={item.name.split(' ').map(n => n[0]).join('')} 
                  style={{ backgroundColor: item.roleColor }} 
                />
                <Badge 
                  size={12} 
                  style={[
                    styles.statusBadge, 
                    item.status === 'online' ? styles.online : 
                    item.status === 'offline' ? styles.offline : styles.busy
                  ]} 
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
              </View>
              <View style={styles.actions}>
                <Button mode="text">Edit</Button>
                <Button mode="text">Delete</Button>
              </View>
            </View>
          </Card>
        )}
      />
      <FAB style={styles.fab} icon="plus" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 16, backgroundColor: '#F4F4F9' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEE', borderRadius: 10, marginBottom: 10, height: 40 },
  searchBar: { flex: 1, padding: 10, color: '#000' },
  filterTabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  tabButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#D8D8D8' },
  tabText: { color: '#333' },
  card: { marginBottom: 10, borderRadius: 10, elevation: 2 },
  cardContent: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatarContainer: { position: 'relative' },
  statusBadge: { position: 'absolute', right: -2, bottom: -2 },
  online: { backgroundColor: 'green' },
  offline: { backgroundColor: 'gray' },
  busy: { backgroundColor: 'orange' },
  infoSection: { flex: 1, marginLeft: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  role: { fontSize: 14, color: '#888' },
  email: { fontSize: 12, color: '#555' },
  phone: { fontSize: 12, color: '#555' },
  actions: { flexDirection: 'row' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#6200ee' }
});

export default EmployeeListApp;