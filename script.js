        const supabase = window.supabase.createClient(
            "https://pplnnnqaufphtletlqoq.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbG5ubnFhdWZwaHRsZXRscW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMzI0NjksImV4cCI6MjA1ODkwODQ2OX0.KYKXEcJhjld49QKytuH2-2qlu7tab7Zt-W34Wp2Umko"
        );

        async function login() {
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();
            const mensagem = document.getElementById("mensagem");

            if (!email || !senha) {
                mensagem.innerText = "Preencha todos os campos!";
                return;
            }

            const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });

            if (error) {
                mensagem.innerText = "Erro: " + error.message;
            } else {
                mensagem.innerText = "Login realizado com sucesso!";
                localStorage.setItem("usuarioEmail", email);
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 2000);
            }
        }

        async function cadastrar() {
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();
            const mensagem = document.getElementById("mensagem");

            if (!email || !senha) {
                mensagem.innerText = "Preencha todos os campos!";
                return;
            }

            const { data, error } = await supabase.auth.signUp({ email, password: senha });

            if (error) {
                mensagem.innerText = "Erro: " + error.message;
            } else {
                mensagem.innerText = "Cadastro realizado com sucesso! Verifique seu e-mail.";
            }
        }