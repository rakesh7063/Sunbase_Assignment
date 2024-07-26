import { Search2Icon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, HStack, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import style from '../styles/Home.module.css';
import { useSelector } from 'react-redux';
import { flushSync } from 'react-dom';
import { useState } from 'react';
import useToastMsg from '../customHooks/useToastMsg';
import { useDispatch } from "react-redux";
import { getAllCustomersAction, syncCustomerAction} from '../redux/customers/customers.actions';

function Navbar() {
     const dispatch = useDispatch();
     const { isOpen, onOpen, onClose } = useDisclosure();
     const { isAuth } = useSelector(store => store.authManager);
     const [searchKey, setSearchKey] = useState(null);
     const [searchValue,setSearchValue] = useState(null);
     const toastMsg = useToastMsg();
     const handleSubmit = () => {

     }
   // search handle  
     const SearchHandle =(e)=>{
setSearchValue(e.target.value);
dispatch(getAllCustomersAction(toastMsg,searchKey,searchValue))
     }
   
  const syncCustomer = ()=>{
       dispatch(syncCustomerAction(toastMsg))
  }

     return (
          true ? <>
               {/* Logged-in user */}
               <Box
                    zIndex='100'
                    minWidth='max-content'
                    p='10px 25px'
                    position="sticky"
                    top='0'
                    left='0'
                    backdropFilter="blur(10px)"
                    boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' >
                    <Box p='2'>
                         <Heading textAlign="center" size='md'>Customer List</Heading>
                    </Box>
                    <Flex gap={4} alignItems='center'>
                         <Button variant='solid' colorScheme='teal' minWidth='max-content' onClick={onOpen}>Add Customer</Button>
                         <Select placeholder='Search by' size='md' width='auto' onChange={(e)=>setSearchKey(e.target.value) }>
                              <option value="firstName">First name</option>
                              <option value="city">City</option>
                              <option value="email">Email</option>
                              <option value="phone">Phone</option>
                         </Select>
                         <InputGroup size='md' width='auto'>
                              <InputRightElement pointerEvents='none'>
                                   <Search2Icon color='gray.300' />
                              </InputRightElement>
                              <Input type='search' placeholder='John' onChange={SearchHandle}/>
                         </InputGroup>
                         <Button variant='solid' colorScheme='teal' loadingText="Sync..." onClick={syncCustomer}>Sync</Button>
                         <Button variant='outline' colorScheme='teal' marginLeft='auto'>Log out</Button>
                    </Flex>
               </Box>

               <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size='2xl'>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalCloseButton />
                         <ModalBody>
                              <form className={style['form']} onSubmit={handleSubmit}>
                                   <Heading textAlign="left" size='md'>Customer Details</Heading>
                                   <InputGroup gap={2}>
                                        <Input type="text" id="first_name" placeholder="First name" />
                                        <Input type="text" id="last_name" placeholder="Last name" />
                                   </InputGroup>
                                   <InputGroup gap={2}>
                                        <Input type="text" id="street" placeholder="Street" />
                                        <Input type="text" id="address" placeholder="Address" />
                                   </InputGroup>
                                   <InputGroup gap={2}>
                                        <Input type="text" id="city" placeholder="City" />
                                        <Input type="text" id="state" placeholder="State" />
                                   </InputGroup>
                                   <InputGroup gap={2}>
                                        <Input type="email" id="email" placeholder="Email" />
                                        <Input type="tel" id="phone" placeholder="Phone" />
                                   </InputGroup>
                                   <Button type="submit" w='fit-content' alignSelf='flex-end' loadingText='Submitting...'>Submit</Button>
                              </form>
                         </ModalBody>
                    </ModalContent>
               </Modal>
          </> : <>
          </>
     )
}

export default Navbar