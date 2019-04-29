import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import {
    Container, Header, Button, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon,
    H1, H2, H3, Content
} from 'native-base';

const cards =
    [
        {
            name: 'Allergy & Anaphylaxis',
            Text1: '\nAn allergy, is an overreaction by the body’s immune system to a normally harmless substance. Substances that can trigger an allergic reaction are called allergens. Allergens may be in medication, in the environment or proteins in the foods we eat. Individuals can have mild/moderate or severe allergies.',
            // Text2: '\n\nHaving a food allergy means that when you eat a food containing that protein (allergen), the immune system releases massive amounts of chemicals, triggering symptoms that can affect a person’s breathing, stomach and gut, skin and/ or heart and blood pressure. \n',
            image: require('../../assets/img/Allergens.jpg'),
        },
        {
            name: '\nCommon Food Allergens',
            Head1: '\nCommon Food Allergens.',
            Text1: '\n• Tree Nuts.',
            Text2: '\n• Soy.',
            Text3: '\n• Fish.',
            Text4: '\n• Peanuts.',
            Text6: '\n• Shellfish.',
            // Text7: '\n• Eggs.',
            // Text8: '\n• Wheat.',
            // Text9: '\n• Dairy.',
            image: require('../../assets/img/dietary_requests.png'),
        },
        {
            name: '\nAllergy & Anaphylaxis Reactions',
            Head1: '\nSigns of a mild to moderate allergic reaction.',
            Text1: '\n• Swelling of the lips, face, eyes.',
            Text2: '\n• Hives or welts.',
            Text3: '\n• Tingling mouth.',
            Text4: '\n• Abdominal pain, vomiting.',
            // Head2: '\nSigns of anaphylaxis (severe allergic reaction)',
            // Text6: '\n• Difficult/noisy breathing.',
            // Text7: '\n• Swelling of tongue/throat.',
            // Text8: '\n• Wheeze/persistent cough.',
            // Text9: '\n• Persistent dizziness or collapse.',
            image: require('../../assets/img/Reactions.png'),
        },
        {
            name: 'Allergy Vs intolerance',
            Head1: 'Allergy',
            Text1: '\nAllergy occurs when a persons immune system reacts to substances in the environment that are harmless for most people.immune system makes antibodies that identify a particular allergen as harmful, even though it isnt. When you come into contact with the allergen, your immune systems reaction can inflame your skin, sinuses, airways or digestive system.',
            // Head2: '\nIntolerance',
            // Text6: '\nIt is easy to confuse food intolerance and food allergy.Intolerances do not involve the body’s immune system unlike food allergy and Coeliac Disease.After eating, some people complain of symptoms like headaches, bloating or mouth ulcers but these are not caused by allergies.Food intolerances are slower in onset and are not life threatening. The most common food chemicals to upset sensitive people are glutamate, amines and salicylates. \n',
            image: require('../../assets/img/intolerance1.jpg'),
        },
        {
            name: 'Food Intolerance Reactions',
            Head1: 'Symptoms of Intolerance.\n',
            Text1: '\n•Nervousness.',
            Text2: '\n•Tremor.',
            Text3: '\n•Sweating.',
            Text4: '\n•Palpitations.',
            Text5: '\n•Rapid breathing.',
            Text6: '\n•Burning sensations on the skin.',
            Text7: '\n•Breathing problems – asthma-like symptoms .',
            image: require('../../assets/img/Intolerant.jpg'),
        },

        {
            name: 'Eating Out With Allergies',
            Head1: 'Precautions to Take.\n',
            Text1: '\n•Disclose your allergy to the restaurant staff.',
            Text2: '\n•Know your allergens and risk ingredients.',
            Text3: '\n•Read the menu carefully and ask questions.',
            Text4: '\n•Do not ask for a guarantee. Risk can be reduce but it can never be removed.',
            // Text5: '\n•Consider ordering simply prepared dishes.',
            // Text6: '\n•Do not assume a dish in one restaurant is the same in another.',
            // Text7: '\n•Beaware of Cross-Contamination .',
            image: require('../../assets/img/eating.png'),
        },
        {
            name: 'Chef Card',
            Head1: 'Chef Card Template.\n\n',
            Text1: '\nIn addition to verbally disclosing your allergy and asking a range of questions about the ingredients and preparation methods, carry a “chef card” that outlines the foods you must avoid.',
            Text2: 'Present the card to the chef or manager.',
            // Text3: '\n\nDownload and print the template and keep along with you when eating out.',
            // Text4: '\n\nClick the following link and access the Checfs card template provided by Allergy & Anaphylaxis Australia ',
            // Text11: 'https://allergyfacts.org.au/images/pdf/AAA_Chef_Card_Template_2018_editable.pdf',
            // Text12: '\n\nClick Here To Access the Chef Card',
            image: require('../../assets/img/chef_card.png'),
        },

    ];

export default class KnowledgeCard extends Component {
    render() {
        return (
            <Container>
                <Content>
                {/* <View> */}
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={cards}
                        renderEmpty={() =>
                            <View style={{ alignSelf: 'center' }}>
                                <Text>Over</Text>
                            </View>
                        }
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={item.image} />
                                        <Body>
                                            <Text><H3>{item.name}</H3></Text>
                                            <Text note>EatSafe</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{ height: 250, flex: 1 }} source={item.image} />
                                </CardItem>
                                <CardItem>

                                    {/* <Icon name="heart" style={{ color: '#ED4A6A' }} /> */}

                                    <Text>{item.blank}
                                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>{item.Head1} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text1} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text2} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text3} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text4} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text5} </Text>
                                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>{item.Head2} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text6} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text7} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text8} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text9} </Text>
                                        <Text style={{ textAlign: 'justify' }}>{item.Text10} </Text>
                                        <Text style={{ textAlign: 'justify' }} onPress={() => Linking.openURL(item.Text11)}>{item.Text12}</Text>
                                    </Text>

                                </CardItem>
                            </Card>
                        }
                    />
                {/* </View> */}
                </Content>
                <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: 'space-between', padding: 1 }}>
                    <Button info iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
                        <Icon name="arrow-back" />
                        <Text>Swipe Left</Text>
                    </Button>
                    <Button info iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
                        <Text>Swipe Right</Text>
                        <Icon name="arrow-forward" />
                    </Button>
                </View>
            </Container>
        );
    }
}

