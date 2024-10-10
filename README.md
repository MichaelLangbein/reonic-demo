# Readme

# Task 1

This code has been implemented as a jupyter notebook, because notebooks display markdown text next to executable code - which seemed like an appropriate format for the task at hand.

- **Solutions** in file [simulation.ipynb](https://github.com/MichaelLangbein/reonic-demo/blob/main/task1/simulation.ipynb)
- **Viewing**: Github should natively render this file
- **Reproducing locally**:
  - ```bash
    conda env create --name <some-env-name>
    conda activate <some-env-name>
    conda install numpy matplotlib jupyter
    cd task1
    python simulation.ipynb
    ```

# Task 2-a

- **Solutions** in directory [task2a](https://github.com/MichaelLangbein/reonic-demo/tree/main/task2a)
- **Viewing**:
- **Reproducing locally**:
  - ```bash
    cd task2a
    npm ci
    npm run dev
    ```
- **Notes**:
  - uses custom state manager (redux seemed like overkill for such a small SPA)
  - uses custom type-ahead (rxjs seemed like overkill, again)
