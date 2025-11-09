@echo off
wsl bash -c "source ~/anaconda3/etc/profile.d/conda.sh && conda activate base && ./start.sh" 
pause