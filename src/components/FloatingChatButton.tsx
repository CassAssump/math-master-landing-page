
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite sua dúvida antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Enviando dúvida para o webhook:", message);

    try {
      const response = await fetch('https://hook.us2.make.com/abso0k9oeikgcqqkephdcnc7vtv8loif', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          question: message,
          timestamp: new Date().toISOString(),
          source: "website_chat",
          url: window.location.href,
        }),
      });

      toast({
        title: "Dúvida Enviada!",
        description: "Sua dúvida foi enviada com sucesso. Nossa equipe responderá em breve!",
      });
      
      setMessage('');
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao enviar dúvida:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua dúvida. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 animate-fade-in">
          <div className="bg-math-gradient text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <span className="font-semibold">Tire suas Dúvidas</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              Tem alguma dúvida sobre matemática? Envie sua pergunta e nossa equipe responderá em breve!
            </p>
            
            <form onSubmit={handleSendMessage} className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua dúvida aqui..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-math-blue-500"
                disabled={isLoading}
              />
              
              <Button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="w-full bg-math-gradient hover:opacity-90 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send size={16} />
                    <span>Enviar Dúvida</span>
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-math-gradient hover:opacity-90 shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'rotate-180' : 'hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </Button>
    </>
  );
};

export default FloatingChatButton;
