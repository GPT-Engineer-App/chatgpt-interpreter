import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, Select } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import OpenAI from 'openai';
import { AnthropicClient } from 'anthropic';

const ChatInterface = () => {
  const [tabs, setTabs] = useState([{ id: 1, messages: [] }]);
  const [activeTab, setActiveTab] = useState(0);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('openai');

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const anthropic = new AnthropicClient({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

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

    try {
      let aiMessage;
      if (model === 'openai') {
        const response = await openai.completions.create({
          model: "text-davinci-003",
          prompt: input,
          max_tokens: 150,
        });
        aiMessage = response.choices[0].text.trim();
      } else if (model === 'anthropic') {
        const response = await anthropic.completions.create({
          model: "claude-v1",
          prompt: input,
          max_tokens: 150,
        });
        aiMessage = response.completion.trim();
      }

      newTabs[activeTab].messages.push({ text: aiMessage, sender: 'ai' });
      setTabs(newTabs);
    } catch (error) {
      console.error("Error fetching response from AI model:", error);
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
        <Button onClick={handleSend}>Send</Button>
      </HStack>
      <HStack mt={4}>
        <Select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
        </Select>
      </HStack>
    </Box>
  );
};

export default ChatInterface;