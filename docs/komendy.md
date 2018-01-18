ssh-agent bash -c 'ssh-add /home/tomek/.ssh/id_rsa_cfe; git clone -b develop git@bitbucket.org:cfe/cfe.git'
 
git branch BR_01
git branch -l
git checkout BR_01


ssh-agent bash -c 'ssh-add /home/tomek/.ssh/id_rsa_cfe; git pull'
ssh-agent bash -c 'ssh-add /home/tomek/.ssh/id_rsa_cfe; git branch -l'
