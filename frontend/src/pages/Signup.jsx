import {
     Flex,
     Box,
     FormControl,
     FormLabel,
     Input,
     InputGroup,
     InputRightElement,
     Stack,
     Button,
     Heading,
     Text,
     useColorModeValue,
     Link,
     Select,
     HStack,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import useToastMsg from '../customHooks/useToastMsg';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {signup} from '../redux/auth/auth.actions'

export default function SignupCard() {
     const dispatch = useDispatch();
     const [showPassword, setShowPassword] = useState(false);
     const signupForm = useRef(null);
     const toastMsg = useToastMsg();
     const navigation = useNavigate();

     const handleSignupSubmission = (e) => {
          e.preventDefault();

          const signupDetails = {
               name: signupForm.current.name.value,
               username: signupForm.current.username.value,
               password: signupForm.current.password.value
          }

          console.table(signupDetails);
          dispatch(signup(signupDetails,navigation,toastMsg));
     }

     return (
          <Flex
               minH={'100vh'}
               align={'center'}
               justify={'center'}
               bg={useColorModeValue('gray.50', 'gray.800')}>
               <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
                    <Stack align={'center'}>
                         <Heading fontSize={'4xl'} textAlign={'center'}>
                              Sign up
                         </Heading>
                         <Text fontSize={'lg'} color={'gray.600'}>
                              to enjoy all of our cool features ✌️
                         </Text>
                    </Stack>
                    <Box
                         rounded={'lg'}
                         bg={useColorModeValue('gray.300', 'gray.700')}
                         boxShadow={'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'}
                         p={8}>
                         <Stack spacing={4}>
                              <form
                                   ref={signupForm}
                                   onSubmit={handleSignupSubmission}
                              >
                                   <FormControl id="name" isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" />
                                   </FormControl>
                                   <FormControl id="username" isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input type="text" />
                                   </FormControl>
                                   <FormControl id="password" isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                             <Input type={showPassword ? 'text' : 'password'} />
                                             <InputRightElement h={'full'}>
                                                  <Button
                                                       variant={'ghost'}
                                                       onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                       {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                  </Button>
                                             </InputRightElement>
                                        </InputGroup>
                                   </FormControl>
                                   <Stack spacing={10} pt={2}>
                                        <Button
                                             type="submit"
                                             loadingText="Submitting"
                                             size="lg"
                                             bg={'blue.400'}
                                             color={'white'}
                                             _hover={{
                                                  bg: 'blue.500',
                                             }}>
                                             Sign up
                                        </Button>
                                   </Stack>
                                   <Stack pt={6}>
                                        <Text align={'center'}>
                                             Already a user? <Link color={'blue.400'} href='/login'>Log in</Link>
                                        </Text>
                                   </Stack>
                              </form>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     )
}