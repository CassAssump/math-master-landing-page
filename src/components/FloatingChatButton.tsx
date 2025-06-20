
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

// A interface para cada mensagem na conversa
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// O componente principal do chatbot
const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Referência para o final da lista de mensagens, para rolar automaticamente
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Efeito que "rola" a tela para a última mensagem sempre que a lista é atualizada
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Função principal para enviar a pergunta do usuário para o webhook
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Cria a mensagem do usuário e a adiciona na tela
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setMessage('');

    try {
      // Envia os dados para a URL do seu webhook no Make.com
      const response = await fetch('https://hook.us2.make.com/abso0k9oeikgcqqkephdcnc7vtv8lo', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (response.ok) {
        // --- MUDANÇA CRÍTICA AQUI ---
        // 1. Lemos a resposta como um objeto JSON, e não como texto.
        const responseData = await response.json(); 
        
        // 2. Pegamos a resposta da IA de dentro da chave 'reply' do objeto.
        const botReplyContent = responseData.reply || "Resposta recebida, mas em um formato inesperado.";

        // Cria a mensagem do bot e a adiciona na tela
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botReplyContent,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);

      } else {
        // Se a resposta do webhook não for 'OK' (ex: erro 500 no Make), lança um erro.
        throw new Error('O webhook retornou uma resposta com erro.');
      }
    } catch (error) {
      console.error("Erro na comunicação com o webhook:", error);
      
      // Cria uma mensagem de erro padrão e a adiciona na tela
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, não foi possível processar sua dúvida no momento. Tente novamente mais tarde.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDERIZAÇÃO DO COMPONENTE (APARÊNCIA) ---
  return (
    <>
      {/* Janela do Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[90vw] bg-white rounded-lg shadow-2xl border border-gray-200 z-40 animate-fade-in">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <span className="font-semibold">Assistente MathFácil</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 rounded-full h-auto">
              <X size={16} />
            </button>
          </div>
          
          <div className="flex flex-col h-96">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.length === 0 && (
                <p className="text-sm text-gray-500 text-center pt-4">
                  Olá! Como posso ajudar com os nossos planos e o curso MathFácil?
                </p>
              )}
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-1 text-right ${msg.isUser ? 'text-white/70' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
               <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua dúvida..."
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                
                <button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 transition-colors"
                >
                   {isLoading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <Send size={20} />
                   )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'rotate-[360deg] scale-90' : 'hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
};

export default FloatingChatButton;
