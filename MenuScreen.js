import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Alert, Modal, TextInput, ScrollView } from 'react-native';

const MenuScreen = () => {
  const initialStarters = [
    { id: '1', name: 'Deviled Eggs', price: 79.99, description: 'Herb-boiled eggs with creamy filling, seasoned yolk mixture', image: require('./assets/DeviledEggs.jpg') },
    { id: '2', name: 'Calamari', price: 111.99, description: 'Lightly breaded and fried squid rings served with marinara or ravioli dipping sauce.', image: require('./assets/Calamari.jpg') },
    { id: '3', name: 'Buffalo Wings', price: 115.50, description: 'Spicy chicken wings served with celery sticks and blue cheese or ranch dressing.', image: require('./assets/BuffaloWings.jpg') },
  ];

  const initialMainCourse = [
    { id: '4', name: 'Chicken Alfredo', price: 250.67, description: 'Creamy Alfredo sauce tossed with grilled chicken and fettuccine pasta, garnished with Parmesan cheese and parsley.', image: require('./assets/ChickenAlfredo.jpg') },
    { id: '5', name: 'BBQ Ribs', price: 224.50, description: 'Slow-cooked, tender ribs coated in a smoky BBQ sauce, served with coleslaw and cornbread.', image: require('./assets/Rib.jpg') },
    { id: '6', name: 'Roast Beef', price: 200.00, description: 'Slow-roasted beef served with gravy, roasted potatoes, and a medley of seasonal vegetables.', image: require('./assets/Beef.jpg') },
  ];

  const initialDesserts = [
    { id: '7', name: 'Chocolate Cake', price: 49.99, description: 'Rich and moist chocolate cake topped with chocolate frosting.', image: require('./assets/ChocolateCake.jpg') },
    { id: '8', name: 'Fruit Tart', price: 39.99, description: 'Crispy tart filled with fresh cream and topped with seasonal fruits.', image: require('./assets/FruitTart.jpg') },
    { id: '9', name: 'Ice Cream Sundae', price: 29.99, description: 'Vanilla ice cream topped with chocolate syrup and whipped cream.', image: require('./assets/IceCreamSundae.jpg') },
  ];

  const [starters, setStarters] = useState(initialStarters);
  const [mainCourse, setMainCourse] = useState(initialMainCourse);
  const [desserts, setDesserts] = useState(initialDesserts);
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => (
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Please add items to the cart before checking out.');
      return;
    }
    const cartDetails = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    const totalPrice = calculateTotal();
    Alert.alert('Checkout', `Items:\n${cartDetails}\n\nTotal Price: $${totalPrice.toFixed(2)}`);
  };

  const handleEditPassword = () => {
    if (password === 'Blue') {
      setModalVisible(false);
      Alert.alert('Success', 'You can now edit the menu.');
    } else {
      Alert.alert('Error', 'Incorrect password. Please try again.');
    }
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.menuItemText}>{item.name} - ${item.price.toFixed(2)}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Button title="Add to Cart" onPress={() => addToCart(item)} />
      </View>
    </View>
  );

  const renderCategory = (title, data) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <FlatList data={data} keyExtractor={item => item.id} renderItem={renderMenuItem} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      {renderCategory('Starters', starters)}
      {renderCategory('Main Course', mainCourse)}
      {renderCategory('Desserts', desserts)}
      <View style={styles.checkoutContainer}>
        <Button title="Checkout" onPress={checkout} />
      </View>
      <View style={styles.editButtonContainer}>
        <Button title="Edit Menu" onPress={() => setModalVisible(true)} />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Password to Edit Menu:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <Button title="Submit" onPress={handleEditPassword} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#0B098C',
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#0B098C',
  },
  menuItem: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B098C',
  },
  description: {
    fontSize: 14,
    color: '#000000',
    marginVertical: 5,
  },
  checkoutContainer: {
    marginTop: 20,
    padding: 10,
  },
  editButtonContainer: {
    marginTop: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    color: '#fff',
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    padding: 10,
    color: 'white',
  },
});

export default MenuScreen;

