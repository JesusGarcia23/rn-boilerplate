import React, { useState } from "react";
import {
    Container, ButtonContainer, ModalContainer, ModalContent, StyledImage
} from './CustomModal.style';
import Modal from 'react-native-modal';
import { StyleSheet, Text } from "react-native";
import Icon from "react-native-dynamic-vector-icons";

export const CustomModal = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <Container>
        <ButtonContainer>
            {/* <StyledImage source={require('../../assets/candy-circle.png')} /> */}
            <Icon 
                name="play" 
                type="Ionicons" 
                size={20} 
                color='white' 
                onPress={() => {setShowModal(true)}}
                style={styles.buttonIcon}
            />
        </ButtonContainer>
            <ModalContainer>
                <Modal
                    backdropOpacity={0.3}
                    isVisible={showModal}
                    onBackdropPress={() => setShowModal(false)}
                    style={styles.contentView}
                >
                    <ModalContent>
                        <Text>Hello World!</Text>
                    </ModalContent>
                </Modal>
            </ModalContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    contentView: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    buttonIcon: {
        textAlign: 'center',
        paddingBottom: 20,
        zIndex: 999,
    }
})