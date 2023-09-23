/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import NamedSection from '../components/layout/named_section';

interface ContactForm {
  name: string;
  company: string;
  phone: string;
  question: string;
}

const Contact = () => {
  const toast = useToast();
  const [error, setError] = useState('');
  const [isSuccess, { on: onSuccess }] = useBoolean();
  const [isLoading, { on: showLoading, off: hideLoading }] = useBoolean();

  const { register, handleSubmit } = useForm<ContactForm>({
    mode: 'onChange',
  });

  const onSend = useCallback<SubmitHandler<ContactForm>>(
    ({ name, phone, company, question }) => {
      showLoading();
      setTimeout(() => {
        hideLoading();
        onSuccess();
        toast({
          description: (
            <Text>
              <b>name: </b>
              {name}
              <br />
              <b>company: </b>
              {company}
              <br />
              <b>phone: </b>
              {phone}
              <br />
              <b>question: </b>
              {question}
              <br />
            </Text>
          ),
          isClosable: true,
        });
      }, 1000);
    },
    [showLoading, hideLoading, onSuccess, toast],
  );

  return (
    <>
      <NamedSection name="Контакты">
        <HStack justify="center" gap="10">
          <VStack alignItems="stretch" gap="5">
            <Box>
              <Heading as="h3" size="lg">
                Адрес
              </Heading>
              <Text>г. Иннополис, ...</Text>
            </Box>
            <Box>
              <Heading as="h3" size="lg">
                Email
              </Heading>
              <Text>lodestar@please-replace-this-domain.com</Text>
            </Box>
            <Box>
              <Heading as="h3" size="lg">
                Телефон
              </Heading>
              <Text>+79876543210</Text>
            </Box>
            <Box>
              <Heading as="h3" size="lg">
                Социальные сети
              </Heading>
              <Text>....</Text>
            </Box>
          </VStack>
          <Image src="/img/map.png" />
        </HStack>
      </NamedSection>
      <NamedSection name="Обратная связь">
        <Card>
          <CardBody>
            {isSuccess ? (
              <Text>Спасибо! Свяжемся с вами в рабочее время.</Text>
            ) : (
              <VStack alignItems="stretch">
                <Text>
                  Оставьте заявку, и мы обязательно свяжемся с вами в течение 14 рабочих дней.
                </Text>
                <FormControl isRequired>
                  <FormLabel>Имя</FormLabel>
                  <Input {...register('name', { required: true })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Организация</FormLabel>
                  <Input {...register('company', { required: true })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Контактный телефон</FormLabel>
                  <InputGroup>
                    <InputLeftElement>+7</InputLeftElement>
                    <Input type="tel" {...register('phone', { required: true })} />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Что вас интересует?</FormLabel>
                  <Input {...register('question', { required: true })} />
                </FormControl>
                <FormControl isInvalid>
                  <FormErrorMessage justifyContent="center">{error}</FormErrorMessage>
                </FormControl>
                <Button isLoading={isLoading} alignSelf="end" onClick={handleSubmit(onSend)}>
                  Отправить
                </Button>
              </VStack>
            )}
          </CardBody>
        </Card>
      </NamedSection>
    </>
  );
};

export default Contact;
