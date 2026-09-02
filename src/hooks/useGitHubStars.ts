// src/hooks/useGitHubStars.ts
import { useEffect, useState } from 'react';

const GITHUB_REPO = 'Firouzzadeh99/portfolio';

export interface GitHubStarsData {
    stars: number;
    forks: number;
    url: string;
    repo: string;
}

interface UseGitHubStarsReturn {
    data: GitHubStarsData | null;
    isLoading: boolean;
    error: string | null;
}

export function useGitHubStars(): UseGitHubStarsReturn {
    const [data, setData] = useState<GitHubStarsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStars() {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${GITHUB_REPO}`,
                    {
                        headers: {
                            Accept: 'application/vnd.github+json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub stars');
                }

                const result = await response.json();

                setData({
                    stars: result.stargazers_count,
                    forks: result.forks_count,
                    url: result.html_url,
                    repo: GITHUB_REPO,
                });
                setError(null);
            } catch (err) {
                console.error('Error fetching GitHub stars:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stars');
            } finally {
                setIsLoading(false);
            }
        }

        fetchStars();
    }, []);

    return { data, isLoading, error };
}