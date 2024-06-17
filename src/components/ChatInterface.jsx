import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { OpenAIApi, Configuration } from 'openai';

const ChatInterface = () => {
  const [tabs, setTabs] = useState([{ id: 1, messages: [] }]);
  const [activeTab, setActiveTab] = useState(0);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Load session history from localStorage
  useEffect(() => {
    const savedTabs = JSON.parse(localStorage.getItem('chatTabs'));
    if (savedTabs) {
      setTabs(savedTabs);
    }
  }, []);

  // Save session history to localStorage
  useEffect(() => {
    localStorage.setItem('chatTabs', JSON.stringify(tabs));
  }, [tabs]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    const newTabs = [...tabs];
    newTabs[activeTab].messages.push({ text: input, sender: 'user' });
    setTabs(newTabs);
    setInput('');
    setLoading(true);

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: input,
        max_tokens: 150,
      });

      const aiMessage = response.data.choices[0].text.trim();
      newTabs[activeTab].messages.push({ text: aiMessage, sender: 'ai' });
      setTabs(newTabs);
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleNewTab = () => {
    const newTab = { id: tabs.length + 1, messages: [] };
    setTabs([...tabs, newTab]);
    setActiveTab(tabs.length);
  };

  return (
    <Box p={4}>
      <Tabs index={activeTab} onChange={handleTabChange}>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={tab.id}>Session {tab.id}</Tab>
          ))}
          <Button onClick={handleNewTab} ml={2}>New Tab</Button>
        </TabList>
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel key={tab.id}>
              <VStack spacing={4} align="stretch">
                {tab.messages.map((msg, idx) => (
                  <Box key={idx} p={2} bg={msg.sender === 'user' ? 'blue.100' : 'gray.100'} borderRadius="md">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <HStack mt={4}>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
        <Button onClick={handleSend} isLoading={loading}>Send</Button>
      </HStack>
    </Box>
  );
};

export default ChatInterface;